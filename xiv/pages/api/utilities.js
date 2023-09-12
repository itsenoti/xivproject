/***************************************
 * Imports
 **************************************/
import INSTANCE from "./foray.json";

/***************************************
 * Constants
 **************************************/
var EPOCH = new Date().getTime() / 1000;
var E_CONSTANT = 3600 / 175;

/***************************************
 * Functions
 **************************************/

/**
 *
 * @param {*} time
 * @returns Add padding "0" to single digits
 */
function formatTime(time) {
  // Place zero in single digits
  if (time < 10) return "0" + time;
  return time;
}

/**
 *
 * @returns Current Eorzea Time in xx:xx format
 */
function getEorzeaTime() {
  var newtime = EPOCH * E_CONSTANT;

  var hh = Math.floor((newtime / 3600) % 24);
  var mm = Math.floor((newtime / 60) % 60);

  return formatTime(hh) + ":" + formatTime(mm);
}

/**
 * @param {*} time
 * @returns xx:00 time when weather changes
 */
export function getHourWeatherChanges(time) {
  var epoch = getNewWeatherStartTimeInMilliseconds() / 1000 + 1400000 * time;
  return formatTime(Math.floor(epoch / 175) % 24) + ":00";
}

function getNewWeatherStartTimeInMilliseconds() {
  var bell = (EPOCH / 175) % 24;
  var startBell = bell - (bell % 8);
  var startUnixSeconds = EPOCH - 175 * (bell - startBell);
  var newDate = new Date(startUnixSeconds * 1000).getTime();

  return newDate % 10 == 0 ? newDate : newDate + 1;
}

export function convertEorzeanTimeToLocalTime(nextTime) {
  var lt = new Date(getNewWeatherStartTimeInMilliseconds() + 1400000 * nextTime);
  return lt;
}

export function getWeatherByZone(futureWeather, zone) {
  var weather = getWeatherForecast(
    computeChance(getNewWeatherStartTimeInMilliseconds() + 1400000 * futureWeather, zone),
    zone
  );
  return weather;
}

/**
 * Function to get when a weather ends
 * @param {*} localTime
 * @returns Date
 */
export function getWeatherEndTime(localTime) {
  return new Date(localTime + (70 / 3) * 60000);
}

export function getTimeDifference_Hour(timeEnd, timeStart) {
  return Math.floor(Math.floor((timeEnd - timeStart) / 60000) / 60);
}

export function getTimeDifference_Minute(timeEnd, timeStart) {
  return Math.floor(Math.floor((timeEnd - timeStart) / 60000) % 60);
}

function computeChance(tMillisecond) {
  var unixSeconds = parseInt(tMillisecond / 1000);
  var eorzeanHours = unixSeconds / 175;
  // Check if eorzeanHours false between 00:00~07:59, 08:00~15:59, 16:00~11:59
  var timeChunk = parseInt(eorzeanHours + 8) % 24;
  // Take Eorzea days since unix epoch
  var eorzeanDays = parseInt(unixSeconds) / 4200;
  // Convert to `uint`
  eorzeanDays = (eorzeanDays << 32) >>> 0;
  // Hash time
  var calcBase = eorzeanDays * 100 + timeChunk;
  var step1 = ((calcBase << 11) ^ calcBase) >>> 0;
  var step2 = ((step1 >>> 8) ^ step1) >>> 0;
  return parseInt(step2) % 100;
}

export function getCurrentWeather(zone) {
  switch (zone) {
    case INSTANCE.Zones.Anemos:
      return getWeatherByZone(0, INSTANCE.Zones.Anemos);
    case INSTANCE.Zones.Pagos:
      return getWeatherByZone(0, INSTANCE.Zones.Pagos);
    case INSTANCE.Zones.Pyros:
      return getWeatherByZone(0, INSTANCE.Zones.Pyros);
    case INSTANCE.Zones.Hydatos:
      return getWeatherByZone(0, INSTANCE.Zones.Hydatos);
  }
}

function getWeatherForecast(chance, zone) {
  switch (zone) {
    case INSTANCE.Zones.Anemos:
      if (chance < 30) return INSTANCE.Weather.FairSkies;
      else if (chance < 60) return INSTANCE.Weather.Gales;
      else if (chance < 90) return INSTANCE.Weather.Showers;
      else return INSTANCE.Weather.Snow;
    case INSTANCE.Zones.Pagos:
      if (chance < 10) return INSTANCE.Weather.FairSkies;
      else if (chance < 28) return INSTANCE.Weather.Fog;
      else if (chance < 46) return INSTANCE.Weather.HeatWaves;
      else if (chance < 64) return INSTANCE.Weather.Snow;
      else if (chance < 82) return INSTANCE.Weather.Thunder;
      else return INSTANCE.Weather.Blizzards;
    case INSTANCE.Zones.Pyros:
      if (chance < 10) return INSTANCE.Weather.FairSkies;
      else if (chance < 28) return INSTANCE.Weather.HeatWaves;
      else if (chance < 46) return INSTANCE.Weather.Thunder;
      else if (chance < 64) return INSTANCE.Weather.Blizzards;
      else if (chance < 82) return INSTANCE.Weather.UmbralWind;
      else return INSTANCE.Weather.Snow;
    case INSTANCE.Zones.Hydatos:
      if (chance < 12) return INSTANCE.Weather.FairSkies;
      else if (chance < 34) return INSTANCE.Weather.Showers;
      else if (chance < 56) return INSTANCE.Weather.Gloom;
      else if (chance < 78) return INSTANCE.Weather.Thunder;
      else return INSTANCE.Weather.Snow;
    case INSTANCE.Zones.Island:
      if ((chance -= 25) < 0) return INSTANCE.Weather.ClearSkies;
      else if ((chance -= 45) < 0) return INSTANCE.Weather.FairSkies;
      else if ((chance -= 10) < 0) return INSTANCE.Weather.Clouds;
      else if ((chance -= 10) < 0) return INSTANCE.Weather.Rain;
      else if ((chance -= 5) < 0) return INSTANCE.Weather.Fog;
      else return INSTANCE.Weather.Showers;
    default:
      return null;
  }
}
