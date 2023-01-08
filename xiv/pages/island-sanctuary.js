import { Chip, Container, ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Title from "../components/title";
import { Animals } from "../pages/api/animals.json";
import Header from "./Header";
import Navigation from "./Navigation";
/**
 * @returns arr of forecast time
 */
function getWeatherForecast(arg_start = 0, arg_end = 0, arg_weather = "") {
  // if (arg_start == 0 && arg_end == 0 && arg_weather == "") return;

  let forecast_et = [];
  let forecast_lt = [];
  let forecast_wt = [];

  for (let i = 0; i < 1000; i++) forecast_et[i] = getETHour(i);

  for (let i = 0; i < 1000; i++) forecast_lt[i] = convertETToLT(i);

  for (let i = 0; i < 1000; i++) forecast_wt[i] = getWeather(i);

  const result = forecast_et.map((time, i) => ({
    et: time,
    lt: forecast_lt[i],
    weather: forecast_wt[i],
  }));

  // console.log(result);

  // arg_start: >0 or >8, or >16
  var sTime;
  if (arg_start >= 0) sTime = "00:00";
  if (arg_start >= 8) sTime = "08:00";
  if (arg_start >= 16) sTime = "16:00";

  // var hasEndtime = parseInt(arg_end) == 0 ? 0 : 1;

  var date;
  var day = 0;
  var tempHour = 0;
  var tempMins = 0;
  for (var i = 1; i < 1000; i++) {
    if (parseInt(arg_end)) {
      if (result[i]["weather"] == arg_weather && result[i]["et"] == sTime) {
        date = new Date(result[i]["lt"]);
        var curDate = new Date();
        console.log(Math.round(Math.abs(date - curDate) / 60000) + " " + "mins");
        var totalMins = Math.round(Math.abs(date - curDate) / 60000);
        tempHour = Math.floor(totalMins / 60);
        if (tempHour > 24) {
          day = Math.floor(tempHour / 24);
          tempHour = tempHour % 24;
        }
        tempMins = totalMins % 60;
        // return formatTime(
        //   date.toLocaleDateString("default", {
        //     month: "short",
        //     day: "2-digit",
        //     hour: "2-digit",
        //     minute: "2-digit",
        //   })
        // );

        return (
          (day ? day + "days " : "") + (tempHour ? tempHour + "hours " : "") + tempMins + "min"
        );
      }
    } else {
      if (result[i]["weather"] == arg_weather) {
        date = new Date(result[i]["lt"]);
        var curDate = new Date();
        console.log(Math.round(Math.abs(date - curDate) / 60000) + " " + "mins");
        var totalMins = Math.round(Math.abs(date - curDate) / 60000);
        tempHour = Math.floor(totalMins / 60);
        if (tempHour > 24) {
          day = Math.floor(tempHour / 24);
          tempHour = tempHour % 24;
        }
        tempMins = totalMins % 60;
        // return formatTime(
        //   date.toLocaleDateString("default", {
        //     month: "short",
        //     day: "2-digit",
        //     hour: "2-digit",
        //     minute: "2-digit",
        //   })
        // );

        return (
          (day ? day + "days " : "") + (tempHour ? tempHour + "hours " : "") + tempMins + "min"
        );
      }
    }
  }
}

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
  var E_CONSTANT = 3600 / 175;
  var epoch = new Date().getTime() / 1000;
  var newtime = epoch * E_CONSTANT;

  var hh = Math.floor((newtime / 3600) % 24);
  var mm = Math.floor((newtime / 60) % 60);

  return formatTime(hh) + ":" + formatTime(mm);
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 8, pb: 3 }}>
        <Title text={"Rare Animals Spawn Tracker "} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {(() => {
            const rows = [];
            for (let i = 0; i < Object.keys(Animals).length; i++) {
              rows.push(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={Object.values(Animals)[i]["icon"]} variant="rounded"></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={primaryDetails(
                      Object.keys(Animals)[i],
                      Object.values(Animals)[i]["loc"]
                    )}
                    secondary={chips(
                      Object.values(Animals)[i]["loot"],
                      Object.values(Animals)[i]["loot2"]
                    )}
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
                        Object.values(Animals)[i]["start"],
                        Object.values(Animals)[i]["end"],
                        Object.values(Animals)[i]["weather"]
                      )}
                    </Typography>{" "}
                  </Card>
                </ListItem>
              );
            }
            return rows;
          })()}
        </List>
      </Container>
    </>
  );
}

export default IslandSanctuary;
