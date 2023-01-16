import style from "./../pages/styles/Gathering.module.css";
import * as Time from "./../utils/TimeConverter";

const E_CONSTANT = 3600 / 175;
const HOUR = 3600;
const MIN = 60;
const TWOMINS55SEC = 175000;
const GATHERINGWINDOW = 360000;

const MIDNIGHT = 0;
const MORNING = 8;
const AFTERNOON = 16;

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

export function lt_getRemainingTimeBeforeSpawn(am, pm) {
  if (isAvailableAnytime(am, pm)) return `Anytime`;

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
    // Convert LT to ET
    let epoch = lastWeatherChange_LT.getTime() / 1000;
    let newtime = epoch * E_CONSTANT;

    let current_hh = Math.floor((newtime / 3600) % 24);

    if (am !== undefined && pm !== undefined) {
      if (current_hh == am || current_hh == pm) {
        if (new Date() <= lastWeatherChange_LT) {
          ltTargetTime = lastWeatherChange_LT;
          break;
        }
      }
    } else if (am !== undefined && pm === undefined) {
      if (current_hh == am) {
        if (new Date() <= lastWeatherChange_LT) {
          ltTargetTime = lastWeatherChange_LT;
          break;
        }
      }
    } else {
      if (current_hh == pm) {
        if (new Date() <= lastWeatherChange_LT) {
          ltTargetTime = lastWeatherChange_LT;
          break;
        }
      }
    }

    lastWeatherChange_LT = new Date(lastWeatherChange_LT.getTime() + TWOMINS55SEC);
  }

  let timeDifference = Time.getTimeDifferenceMs(ltTargetTime.getTime(), new Date().getTime());
  var hour = Time.getNumberOfHours(timeDifference);
  var min = Time.getNumberOfMinutes(timeDifference);
  var secs = Time.getNumberOfSeconds(timeDifference);

  min = formatTime(min);
  secs = formatTime(secs);

  // Time's up
  if (min >= 29) {
    let subMin = min;
    subMin = min - 29;
    return (
      <span className={style.spawned}>
        {formatTime(subMin)}:{secs}
      </span>
    );
  }

  return `${min}:${secs}`;
}

/**
 *
 * @param {int} ETToConvert Eorzean hour to convert
 * @returns equivalent time in earth in ms
 */
function convertETotLT(ETToConvert) {
  if (!ETToConvert) return;

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
  if (am === undefined && pm === undefined) return true;
  return false;
}

function formatTime(time) {
  if (time < 10) return `0${time}`;

  return time;
}
