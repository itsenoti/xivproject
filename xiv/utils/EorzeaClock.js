import * as Time from "./../utils/TimeConverter";

const E_CONSTANT = 3600 / 175;
const HOUR = 3600;
const MIN = 60;
const TWOMINS55SEC = 175000;
const GATHERINGWINDOW = 360000;

const MIDNIGHT = 0;
const MORNING = 8;
const AFTERNOON = 16;

export function getCurrentEorzeanHour() {
  var E_CONSTANT = 3600 / 175;
  var epoch = new Date().getTime() / 1000;
  var newtime = epoch * E_CONSTANT;

  var hh = Math.floor((newtime / 3600) % 24);

  return hh;
}

export function getCurrentEorzeanMinute() {
  var E_CONSTANT = 3600 / 175;
  var epoch = new Date().getTime() / 1000;
  var newtime = epoch * E_CONSTANT;

  let mm = Math.floor((newtime / 60) % 60);

  return mm;
}

export function lt_getLtByET(et) {
  let epoch = new Date().getTime() / 1000;
  let newtime = epoch * E_CONSTANT;

  return new Date(newtime);
}
function generateNewStartTime() {
  let EPOCH = new Date().getTime() / 1000;
  let bell = (EPOCH / 175) % 24;
  let startBell = bell - (bell % 8);
  let startUnixSeconds = EPOCH - 175 * (bell - startBell);
  let newDate = new Date(startUnixSeconds * 1000).getTime();
  return newDate % 10 == 0 ? newDate : newDate + 1;
}

function getETBaseHour(iteration) {
  var base = generateNewStartTime() / 1000 + 1400000 * (iteration - 1);
  return formatTime(Math.floor(base / 175) % 24) + ":00";
}

function getLTUsingETBaseHour(iteration) {
  var lt = new Date(generateNewStartTime() + 1400000 * (iteration - 1));
  return lt;
}

function getEorzeaTime(ET_Date) {
  let E_CONSTANT = 3600 / 175;
  let epoch = new Date(ET_Date).getTime() / 1000;
  let newtime = epoch * E_CONSTANT;

  let hh = Math.floor((newtime / 3600) % 24);
  let mm = Math.floor((newtime / 60) % 60);

  return formatTime(hh) + ":" + formatTime(mm);
}

export function lt_getRemainingTimeBeforeSpawn(spawnTime) {
  // console.log(`spawnTime ${formatTime(spawnTime)}`);
  if (isAvailableAnytime(spawnTime)) {
    return `--:--`;
  }

  let allETHours = [];
  let allLTHours = [];

  for (let index = 0; index < 100; index++) {
    allETHours[index] = getETBaseHour(index);
    allLTHours[index] = getLTUsingETBaseHour(index);
  }

  let allETLTMapping = allETHours.map((time, i) => ({
    et: time,
    lt: allLTHours[i],
  }));

  // **********************************************************************************
  var EveryETHourToLT = {};
  let dlastWeatherChange_LT = allLTHours[0];
  for (let i = 0; i < 24; i++) {
    let epoch = dlastWeatherChange_LT.getTime() / 1000;
    let newtime = epoch * E_CONSTANT;
    let current_hh = Math.floor((newtime / 3600) % 24);

    dlastWeatherChange_LT = new Date(dlastWeatherChange_LT.getTime() + TWOMINS55SEC);
    EveryETHourToLT[getEorzeaTime(dlastWeatherChange_LT)] = { lt: dlastWeatherChange_LT };
  }

  var ltTargetTime = EveryETHourToLT[formatTime(spawnTime) + ":00"];

  if (!ltTargetTime) return 0;
  if (ltTargetTime.lt < new Date()) return 0;

  let timeDifference = Time.getTimeDifferenceMs(ltTargetTime.lt.getTime(), new Date().getTime());
  let min = Time.getNumberOfMinutes(timeDifference);

  if (min > 28) return 0;

  let secs = Time.getNumberOfSeconds(timeDifference);

  secs = formatTime(secs);
  min = formatTime(min);

  if (min > 1) return `${min}m`;

  return `${min}:${secs}`;
}

/**
 *
 * @param {int} ETToConvert Eorzean hour to convert
 * @returns equivalent time in earth in ms
 */
export function convertETotLT(ETToConvert) {
  // if (!ETToConvert) return;

  let allETHours = [];
  let allLTHours = [];

  for (let index = 0; index < 1000; index++) {
    allETHours[index] = getETBaseHour(index);
    allLTHours[index] = getLTUsingETBaseHour(index);
  }

  let allETLTMapping = allETHours.map((time, i) => ({
    et: time,
    lt: allLTHours[i],
  }));

  let lastWeatherChange_ET = allETHours[0];
  let lastWeatherChange_LT = allLTHours[0];

  var ltTargetTime = new Date();
  for (let index = 0; index < 1000; index++) {
    let epoch = lastWeatherChange_LT.getTime() / 1000;
    let newtime = epoch * E_CONSTANT;

    let current_hh = Math.floor((newtime / 3600) % 24);

    if (current_hh == ETToConvert) {
      if (new Date() <= lastWeatherChange_LT) {
        ltTargetTime = lastWeatherChange_LT;
        break;
      }
    }

    lastWeatherChange_LT = new Date(lastWeatherChange_LT.getTime() + TWOMINS55SEC);
  }

  return ltTargetTime;
}

export function inGatheringWindow(ETToConvert) {
  let endtime = ETToConvert + 1 >= 24 ? ETToConvert - 23 : ETToConvert + 1;

  let timeDifference = Time.getTimeDifferenceMs(convertETotLT(endtime), new Date().getTime());
  let min = Time.getNumberOfMinutes(timeDifference);
  let secs = Time.getNumberOfSeconds(timeDifference);

  secs = formatTime(secs);
  min = formatTime(min);
  return `@${min}:${secs}`;
}

function isPastMidnight(time) {
  if (time >= 0 && time < 8) return true;
  return false;
}

function isMorning(time) {
  if (time >= 8 && time < 16) return true;
  return false;
}

function isAfternoon(time) {
  if (time >= 16 && time < 24) return true;
  return false;
}

function isAvailableAnytime(am, pm) {
  if (am === undefined) return true;
  return false;
}

export function formatTime(time) {
  if (time < 10) return `0${time}`;

  return time;
}
