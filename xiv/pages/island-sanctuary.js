import { Chip, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { atomOneDark, CodeBlock } from "react-code-blocks";
import Title from "../components/title";
import { Animals } from "../pages/api/animals.json";
import Header from "./Header";
import Navigation from "./Navigation";

import * as Style from "./../pages/styles/IslandSanctuary.module.css";
import * as Time from "./../utils/TimeConverter";

/**
 * @description This function gets all ET where weather changes (ie 00:00, 08:00, 16:00)
 * @returns Returns 00:00, 08:00, 16:00;
 */
function getETHour(time) {
  var epoch = getNewWeatherStartTimeMs() / 1000 + 1400000 * (time - 1);
  return formatTime(Math.floor(epoch / 175) % 24) + ":00";
}

/**
 * @description Converts ET to earth time
 * @returns Time in Earth Time (date+timezone+time)
 */
function convertETToLT(nextTime) {
  var lt = new Date(getNewWeatherStartTimeMs() + 1400000 * (nextTime - 1));
  return lt;
}

function getEorzeaTime() {
  let E_CONSTANT = 3600 / 175;
  let epoch = new Date().getTime() / 1000;
  let newtime = epoch * E_CONSTANT;

  let hh = Math.floor((newtime / 3600) % 24);
  let mm = Math.floor((newtime / 60) % 60);

  return formatTime(hh) + ":" + formatTime(mm);
}

function getCurrentEorzeanHour() {
  var E_CONSTANT = 3600 / 175;
  var epoch = new Date().getTime() / 1000;
  var newtime = epoch * E_CONSTANT;

  var hh = Math.floor((newtime / 3600) % 24);

  return formatTime(hh);
}

function getNewWeatherStartTimeMs() {
  var EPOCH = new Date().getTime() / 1000;
  var bell = (EPOCH / 175) % 24;
  var startBell = bell - (bell % 8);
  var startUnixSeconds = EPOCH - 175 * (bell - startBell);
  var newDate = new Date(startUnixSeconds * 1000).getTime();
  return newDate % 10 == 0 ? newDate : newDate + 1;
}

function formatTime(time) {
  if (time < 10) return "0" + time;
  return time;
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

function getForecast(chance) {
  if ((chance -= 25) < 0) {
    return "Clear Skies";
  } else if ((chance -= 45) < 0) {
    return "Fair Skies";
  } else if ((chance -= 10) < 0) {
    return "Clouds";
  } else if ((chance -= 10) < 0) {
    return "Rain";
  } else if ((chance -= 5) < 0) {
    return "Fog";
  } else {
    return "Showers";
  }
}

function getWeather(futureWeather) {
  var weather = getForecast(
    computeChance(getNewWeatherStartTimeMs() + 1400000 * (futureWeather - 1))
  );
  return weather;
}

function IslandSanctuary() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentDateTimeMs, setCurrentDateTimeMs] = useState(new Date().getTime());
  const [mounted, setMounted] = useState(false);
  var dateDifference = 0;
  var day = 0;
  var hour = 0;
  var min = 0;
  var secs = 0;
  var isAlmostOver = false;
  var isAlmostReady = false;
  const _8MIN45SEC = 525000;
  const _TOTALFORECAST = 1000;

  var forecastList = [null];

  useEffect(() => {
    setMounted(true);
    setTimeout(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);
  }, [currentDateTimeMs]);

  // Avoid hydration issues
  if (!mounted) return null;

  function chips(obj1, obj2) {
    const chip = (
      <>
        <Chip label={obj1} size="small" variant="outlined" sx={{ mr: "0.3rem" }}></Chip>
        <Chip label={obj2} size="small"></Chip>
      </>
    );
    return chip;
  }

  function primaryDetails(obj1, obj2) {
    const primaryDetails = (
      <>
        <Typography variant="body2">
          {obj1} <small>({obj2})</small>
        </Typography>
      </>
    );

    return primaryDetails;
  }

  function allAnimalsSpawnTimeForecast(arg) {
    if (Object.keys(Animals).length == 0) return;

    var animal = Object.keys(Animals);
    var rows = [];

    for (var i in animal) {
      rows.push(
        <ListItem>
          <ListItemAvatar>
            <Avatar src={Object.values(Animals)[i]["icon"]} variant="rounded"></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={primaryDetails(Object.keys(Animals)[i], Object.values(Animals)[i]["loc"])}
            secondary={chips(Object.values(Animals)[i]["loot"], Object.values(Animals)[i]["loot2"])}
            secondaryTypographyProps={{
              sx: { color: "inherit", fontSize: "25rem", color: "text.secondary" },
            }}
          />
          <Card
            variant="outlined"
            sx={{ width: "7rem", p: 1, fontFamily: "inherit", textAlign: "center" }}
          >
            <Typography variant="body2">
              {getWeatherForecast(
                Object.keys(Animals)[i],
                Object.values(Animals)[i]["start"],
                Object.values(Animals)[i]["end"],
                Object.values(Animals)[i]["weather"],
                arg
              )}
            </Typography>{" "}
          </Card>
        </ListItem>
      );
    }

    return rows;
  }

  function getSpecificLT(animal, arg_start, earthtime) {
    // Eorzean time                   // Earth Equivalent
    // ----------------------------------------------
    // 1 minute	60 seconds(1 minute) 	  2 11/12 seconds
    // 1 bell	  60 minutes(1 hour)  	  2 minutes, 55 seconds
    // 1 sun	  24 bells(1day)	       70 minutes
    // 1 week	   8 suns (1 week)	      9 hours and 20 minutes
    // 1 moon	   4 weeks(1 month)	     37 hours and 20 minutes
    // 1 year	  12 moons(1 year)	     18 days and 16 hours
    var dummytime = earthtime;
    for (let i = 0; i < _TOTALFORECAST; i++) {
      const E_CONSTANT = 3600 / 175;
      let ticks = dummytime.getTime() / 1000;
      let newtime = ticks * E_CONSTANT;

      let hh = formatTime(Math.floor((newtime / 3600) % 24));
      let mm = formatTime(Math.floor((newtime / 60) % 60));

      if (hh == formatTime(arg_start)) {
        return dummytime;
      }

      dummytime = new Date(dummytime.getTime() + 175000);
    }
  }

  /**
   * @returns arr of forecast time
   */
  function getWeatherForecast(animal, arg_start = 0, arg_end = 0, arg_weather = "", currentDateMs) {
    let forecast_et = [];
    let forecast_lt = [];
    let forecast_wt = [];
    var outlookDate = 0;
    var currentDate = new Date(currentDateMs);
    var convertedStartTime;
    var outlookDatePlus8mins;

    for (let i = 0; i < _TOTALFORECAST; i++) {
      forecast_et[i] = getETHour(i);
      forecast_lt[i] = convertETToLT(i); // ← LT here is equivalent for 00:00, 08:00, and 16:00
      forecast_wt[i] = getWeather(i);
    }

    // Collate ET, LT, and Weather in 1 array
    forecastList = forecast_et.map((time, i) => ({
      et: time,
      lt: forecast_lt[i],
      weather: forecast_wt[i],
    }));

    convertedStartTime = convertSpawnTimeToET(arg_start);

    for (var i = 1; i < _TOTALFORECAST; i++) {
      if (parseInt(arg_end)) {
        if (
          forecastList[i]["weather"] == arg_weather &&
          forecastList[i]["et"] == convertedStartTime
        ) {
          outlookDate = getSpecificLT(animal, arg_start, forecastList[i]["lt"]);

          outlookDatePlus8mins = new Date(outlookDate.getTime() + _8MIN45SEC);

          if (isWithinSpawnWindow(outlookDate, currentDate, outlookDatePlus8mins)) {
            return displayForecastTime_Expired(outlookDatePlus8mins, currentDateMs);
          } else {
            if (outlookDate > currentDate) {
              return displayForecastTime_Active(outlookDate, currentDateMs);
            }
          }
        }
      } else if (forecastList[i]["weather"] == arg_weather) {
        outlookDate = getSpecificLT(animal, 0, forecastList[i]["lt"]);

        outlookDatePlus8mins = new Date(outlookDate.getTime() + _8MIN45SEC);

        if (isWithinSpawnWindow(outlookDate, currentDate, outlookDatePlus8mins)) {
          return displayForecastTime_Expired(outlookDatePlus8mins, currentDateMs);
        } else {
          if (outlookDate > currentDate) {
            return displayForecastTime_Active(outlookDate, currentDateMs);
          }
        }
      }
    }
  }

  function displayForecastTime_Expired(outlookDate, currentDateMs) {
    dateDifference = Time.getTimeDifferenceMs(outlookDate, currentDateMs);
    min = Time.getNumberOfMinutes(dateDifference);
    secs = Time.getNumberOfSeconds(dateDifference);

    isAlmostOver = min == 0 && secs < 30 ? true : false;

    return (
      <span className={isAlmostOver ? Style.isAlmostOver : Style.hasSpawned} title={outlookDate}>
        {`Available for `} <br />
        {`${min == 0 ? "" : min + "m"} ${secs}s`}
      </span>
    );
  }

  function displayForecastTime_Active(outlookDate, currentDateMs) {
    dateDifference = Time.getTimeDifferenceMs(outlookDate.getTime(), currentDateMs);

    day = Time.getNumberOfDays(dateDifference);
    hour = Time.getNumberOfHours(dateDifference);
    min = Time.getNumberOfMinutes(dateDifference);
    secs = Time.getNumberOfSeconds(dateDifference);

    isAlmostReady = hour == 0 && min < 5 ? true : false;

    return (
      <span
        className={isAlmostReady ? Style.isAlmostReady : Style.remainingTime}
        title={outlookDate}
      >
        {hour == 0 && min == 0 && secs == 0
          ? `Ready to spawn`
          : `${day == 0 ? "" : day + "d"} 
          ${hour == 0 ? "" : hour + "h"} 
          ${hour == 0 && min <= 1 ? secs + "s" : min + "m"}`}
      </span>
    );
  }

  function isWithinSpawnWindow(outlookDate, currentDate, outlookDatePlus8_45mins) {
    // Spawn window is 8 minutes and 45 seconds (Earth Hour) after the spawn time start
    return (
      (outlookDate < currentDate && outlookDatePlus8_45mins > currentDate) ||
      outlookDate == currentDate
    );
  }

  function convertSpawnTimeToET(arg_start) {
    if (arg_start >= 16) return "16:00";
    if (arg_start >= 8) return "08:00";
    if (arg_start >= 0) return "00:00";
  }

  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 8, pb: 3 }}>
        <Title text={"Rare Animals Spawn Tracker "} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {allAnimalsSpawnTimeForecast(currentDateTimeMs)}
        </List>
        <Title text={"Macros"} />
        The macro below will trigger the Duty Action I (Sprint), target a node, enable lock on, then
        automatically makes your character run to it. This, however, won&apos;t auto-gather so you
        need to press the confirm key (Num0 or X in PS4 Controller) to start gathering.
        <br />
        <br />
        <CodeBlock
          text={`/merror off
/micon "Duty Action I"
/ac "Duty Action I"
/targetnpc
/lockon on
/automove on`}
          language="python"
          showLineNumbers="true"
          wrapLines
          theme={atomOneDark}
          className="code"
        ></CodeBlock>
        <br />
        For longer distances between nodes, you can also use the mount version: (Feel free to change
        &quot;Company Chocobo&quot; to your mount of choice)
        <br />
        <br />
        <CodeBlock
          text={`/merror off
/micon "Company Chocobo" mount
/targetnpc
/mount "Company Chocobo"
/wait 2
/lockon on
/automove on`}
          language="python"
          showLineNumbers="true"
          wrapLines
          theme={atomOneDark}
        ></CodeBlock>
      </Container>
    </>
  );
}

export default IslandSanctuary;
