/**
 * @ Author: F.Villanueva
 * @ Create Time: 2023-09-18 10:36:04
 * @ Modified by: F.Villanueva
 * @ Modified time: 2023-10-08 09:41:37
 * @ Description:
 */

/************************************************************
 * Imports
 ************************************************************/
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatTime } from "../utils/formatNumber";

/************************************************************
 * Constants
 ************************************************************/
const EPOCH = new Date().getTime() / 1000;
const E_CONSTANT = 3600 / 175;
const CURRENT_WEATHER = 0;

export const Zones = {
  Anemos: "Anemos",
  Pagos: "Pagos",
  Pyros: "Pyros",
  Hydatos: "Hydatos",
  Island: "Sanctuary Island",
  Bozja: "Bozjan Southern Front",
};

const Weather = {
  Blizzards: "Blizzards",
  ClearSkies: "Clear Skies",
  Clouds: "Clouds",
  FairSkies: "Fair Skies",
  Fog: "Fog",
  Gales: "Gales",
  Gloom: "Gloom",
  HeatWaves: "Heat Waves",
  Rain: "Rain",
  Showers: "Showers",
  Snow: "Snow",
  Thunder: "Thunder",
  UmbralWind: "Umbral Wind",
};

export function getCurrentEorzeaTime() {
  var newtime = EPOCH * E_CONSTANT;

  var hour = Math.floor((newtime / 3600) % 24);
  var minute = Math.floor((newtime / 60) % 60);

  return `${formatTime(hour)}:${formatTime(minute)}`;
}

export function getHourWeatherChanges(time) {
  var epoch = getNewWeatherStartTimeInMilliseconds() / 1000 + 1400000 * time;
  return formatTime(Math.floor(epoch / 175) % 24) + ":00";
}

/************************************************************
 * Function to compute weather chance given time in milliseconds
 * @returns Chance (int)
 ************************************************************/
function computeWeatherChance(timeMs) {
  var unixSeconds = parseInt(timeMs / 1000);

  var eorzeanHours = unixSeconds / 175;

  var timeChunk = parseInt(eorzeanHours + 8) % 24; // Check if eorzeanHours false between 00:00~07:59, 08:00~15:59, 16:00~11:59

  var eorzeanDays = parseInt(unixSeconds) / 4200; // Take Eorzea days since unix epoch

  eorzeanDays = (eorzeanDays << 32) >>> 0; // Convert to `uint`

  var calcBase = eorzeanDays * 100 + timeChunk; // Hash time

  var step1 = ((calcBase << 11) ^ calcBase) >>> 0;

  var step2 = ((step1 >>> 8) ^ step1) >>> 0;

  return parseInt(step2) % 100;
}

export function convertEorzeanTimeToLocalTime(time) {
  return new Date(getNewWeatherStartTimeInMilliseconds() + 1400000 * time);
}

export function getCurrentWeather(zone) {
  switch (zone) {
    case Zones.Anemos:
      return getWeatherByZone(CURRENT_WEATHER, Zones.Anemos);
    case Zones.Pagos:
      return getWeatherByZone(CURRENT_WEATHER, Zones.Pagos);
    case Zones.Pyros:
      return getWeatherByZone(CURRENT_WEATHER, Zones.Pyros);
    case Zones.Hydatos:
      return getWeatherByZone(CURRENT_WEATHER, Zones.Hydatos);
  }
}

/************************************************************
 * Get time when the current weather ends
 * @returns Date (Date())
 ************************************************************/
export function getWeatherEndTime(localTime) {
  return new Date(localTime + (70 / 3) * 60000);
}

export function getWeatherByZone(futureWeather, zone) {
  return getWeatherForecastByZone(
    computeWeatherChance(getNewWeatherStartTimeInMilliseconds() + 1400000 * futureWeather, zone),
    zone
  );
}

function getNewWeatherStartTimeInMilliseconds() {
  var bell = (EPOCH / 175) % 24;
  var startBell = bell - (bell % 8);
  var startUnixSeconds = EPOCH - 175 * (bell - startBell);
  var newDate = new Date(startUnixSeconds * 1000).getTime();

  return newDate % 10 == 0 ? newDate : newDate + 1;
}

/************************************************************
 * Get the weather for the specific zone
 * @returns Weather (string)
 ************************************************************/
function getWeatherForecastByZone(chance, zone) {
  switch (zone) {
    case Zones.Anemos:
      if (chance < 30) return Weather.FairSkies;
      else if (chance < 60) return Weather.Gales;
      else if (chance < 90) return Weather.Showers;
      else return Weather.Snow;
    case Zones.Pagos:
      if (chance < 10) return Weather.FairSkies;
      else if (chance < 28) return Weather.Fog;
      else if (chance < 46) return Weather.HeatWaves;
      else if (chance < 64) return Weather.Snow;
      else if (chance < 82) return Weather.Thunder;
      else return Weather.Blizzards;
    case Zones.Pyros:
      if (chance < 10) return Weather.FairSkies;
      else if (chance < 28) return Weather.HeatWaves;
      else if (chance < 46) return Weather.Thunder;
      else if (chance < 64) return Weather.Blizzards;
      else if (chance < 82) return Weather.UmbralWind;
      else return Weather.Snow;
    case Zones.Hydatos:
      if (chance < 12) return Weather.FairSkies;
      else if (chance < 34) return Weather.Showers;
      else if (chance < 56) return Weather.Gloom;
      else if (chance < 78) return Weather.Thunder;
      else return Weather.Snow;
    case Zones.Island:
      if ((chance -= 25) < 0) return Weather.ClearSkies;
      else if ((chance -= 45) < 0) return Weather.FairSkies;
      else if ((chance -= 10) < 0) return Weather.Clouds;
      else if ((chance -= 10) < 0) return Weather.Rain;
      else if ((chance -= 5) < 0) return Weather.Fog;
      else return Weather.Showers;
    default:
      return null;
  }
}

export function mb_getWeatherForecast(zone = "", weatherToTrack = "", mobName = "") {
  var zoneObj = {};
  var currentTime = new Date();

  switch (zone) {
    case Zones.Anemos: {
      for (let i = 0; ; i++) {
        if (
          weatherToTrack === getWeatherByZone(i, Zones.Anemos) &&
          (getHourWeatherChanges(i) === "00:00" || getHourWeatherChanges(i) === "16:00") &&
          currentTime < convertEorzeanTimeToLocalTime(i + 1)
        ) {
          zoneObj = {
            ET: getHourWeatherChanges(i),
            LT_Start: convertEorzeanTimeToLocalTime(i),
            LT_End: convertEorzeanTimeToLocalTime(i + 1),
            Anemos: getWeatherByZone(i, Zones.Anemos),
          };

          return computeRemainingTime(zoneObj, currentTime);
        }
      }
    }
    case Zones.Pagos: {
      for (let i = 0; ; i++) {
        if (
          weatherToTrack === getWeatherByZone(i, Zones.Pagos) &&
          currentTime < convertEorzeanTimeToLocalTime(i + 1)
        ) {
          zoneObj = {
            ET: getHourWeatherChanges(i),
            LT_Start: convertEorzeanTimeToLocalTime(i),
            LT_End: convertEorzeanTimeToLocalTime(i + 1),
            Pagos: getWeatherByZone(i, Zones.Pagos),
          };

          return computeRemainingTime(zoneObj, currentTime);
        }
      }
    }
    case Zones.Pyros: {
      for (let i = 0; ; i++) {
        if (
          weatherToTrack === getWeatherByZone(i, Zones.Pyros) &&
          currentTime < convertEorzeanTimeToLocalTime(i + 1)
        ) {
          zoneObj = {
            ET: getHourWeatherChanges(i),
            LT_Start: convertEorzeanTimeToLocalTime(i),
            LT_End: convertEorzeanTimeToLocalTime(i + 1),
            Pyros: getWeatherByZone(i, Zones.Pyros),
          };

          return computeRemainingTime(zoneObj, currentTime);
        }
      }
    }
    case Zones.Hydatos: {
      for (let i = 0; ; i++) {
        if (
          weatherToTrack === getWeatherByZone(i, Zones.Hydatos) &&
          currentTime < convertEorzeanTimeToLocalTime(i + 1)
        ) {
          zoneObj = {
            ET: getHourWeatherChanges(i),
            LT_Start: convertEorzeanTimeToLocalTime(i),
            LT_End: convertEorzeanTimeToLocalTime(i + 1),
            Hydatos: getWeatherByZone(i, Zones.Hydatos),
          };

          return computeRemainingTime(zoneObj, currentTime);
        }
      }
    }
  }
}

export function computeRemainingTime(zoneObj, currentTimeDate) {
  if (new Date() >= zoneObj.LT_Start) {
    return (
      <span className="text-green-500">
        ends in {computeRelativeTime(zoneObj.LT_End, currentTimeDate, "hr")}
      </span>
    );
  } else {
    return `starts in ${computeRelativeTime(zoneObj.LT_Start, currentTimeDate, "hr")}`;
  }
}

export const computeRelativeTime = (futureTime) => {
  dayjs.extend(relativeTime);
  return dayjs(futureTime).fromNow(true);
};
