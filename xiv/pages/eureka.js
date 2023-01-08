import { Container, ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Title from "../components/title";
// import { WeatherIcons } from "../pages/api/eureka.json";
// import { Zones } from "./api/eureka.json";
import Eureka from "./api/eureka.json";
import Header from "./Header";
import Navigation from "./Navigation";
/**
 * @returns arr of forecast time
 */
function getWeatherForecast(weather = "", zone = "") {
  let forecast_et = [];
  let forecast_lt = [];
  let forecast_wt = [];

  for (let i = 0; i < 100; i++) forecast_et[i] = getETHour(i);

  for (let i = 0; i < 100; i++) forecast_lt[i] = convertETToLT(i);

  for (let i = 0; i < 100; i++) forecast_wt[i] = getWeather(i, zone);

  /* Collate ET Hour + LT Hour + Weather */
  const result = forecast_et.map((time, i) => ({
    et: time,
    lt: forecast_lt[i],
    weather: forecast_wt[i],
  }));
  // console.log(result);
  var date;
  for (var i = 1; i < 100; i++) {
    // If Anemos, check if also Night Time
    if (zone == Eureka.Zones.Anemos) {
      if (
        result[i]["weather"] === weather &&
        (result[i]["et"] === "00:00" || result[i]["et"] === "16:00")
      ) {
        date = new Date(result[i]["lt"]);
        return formatTime(
          date.toLocaleDateString("default", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    } else {
      if (result[i]["weather"] === weather) {
        date = new Date(result[i]["lt"]);
        return formatTime(
          date.toLocaleDateString("default", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    }
    // }
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

const ZONES = {
  EUREKA_ANEMOS: "Anemos",
  EUREKA_PAGOS: "Pagos",
  EUREKA_PYROS: "Pyros",
  EUREKA_HYDATOS: "Hydatos",
};

function getForecast(chance, zone) {
  // console.log(Zones["Anemos"]);
  switch (zone) {
    case ZONES.EUREKA_ANEMOS:
      if (chance < 30) return "Fair Skies";
      else if (chance < 60) return "Gales";
      else if (chance < 90) return "Showers";
      else return "Snow";
    case ZONES.EUREKA_PAGOS:
      if (chance < 10) return "Fair Skies";
      else if (chance < 28) return "Fog";
      else if (chance < 46) return "Heat Waves";
      else if (chance < 64) return "Snow";
      else if (chance < 82) return "Thunder";
      else return "Blizzards";
    case ZONES.EUREKA_PYROS:
      if (chance < 10) return "Fair Skies";
      else if (chance < 28) return "Heat Waves";
      else if (chance < 46) return "Thunder";
      else if (chance < 64) return "Blizzards";
      else if (chance < 82) return "Umbral Wind";
      else return "Snow";
    case ZONES.EUREKA_HYDATOS:
      if (chance < 12) return "Fair Skies";
      else if (chance < 34) return "Showers";
      else if (chance < 56) return "Gloom";
      else if (chance < 78) return "Thunder";
      else return "Snow";
    default:
      return null;
  }
}

function getWeather(futureWeather, zone) {
  var weather = getForecast(
    computeChance(getNewWeatherStartTimeMs() + 1400000 * (futureWeather - 1), zone),
    zone
  );
  return weather;
}

function IslandSanctuary() {
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  var AnemosWeatherList = ["Gales"];
  var PagosWeatherList = ["Blizzards", "Fog"];
  var PyrosWeatherList = ["Heat Waves"];
  var HydatosWeatherList = ["Gloom", "Thunder"];

  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={Eureka.Zones.Anemos} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {(() => {
            const rows = [];
            for (let i = 0; i < AnemosWeatherList.length; i++) {
              rows.push(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={Eureka.WeatherIcons[AnemosWeatherList[i]]}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={AnemosWeatherList[i]}
                    // secondary={Object.values(Animals)[i]["loot"]}
                    secondaryTypographyProps={{ sx: { color: "inherit" } }}
                  />
                  <Card variant="outlined" sx={{ p: 1, fontFamily: "inherit" }}>
                    <Typography variant="body2">
                      {getWeatherForecast(AnemosWeatherList[i], Eureka.Zones.Anemos)}
                    </Typography>{" "}
                  </Card>
                </ListItem>
              );
            }
            return rows;
          })()}
        </List>

        <Title text={Eureka.Zones.Pagos} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {(() => {
            const rows = [];
            for (let i = 0; i < PagosWeatherList.length; i++) {
              rows.push(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={Eureka.WeatherIcons[PagosWeatherList[i]]}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={PagosWeatherList[i]}
                    // secondary={Object.values(Animals)[i]["loot"]}
                    secondaryTypographyProps={{ sx: { color: "inherit" } }}
                  />
                  <Card variant="outlined" sx={{ p: 1, fontFamily: "inherit" }}>
                    <Typography variant="body2">
                      {getWeatherForecast(PagosWeatherList[i], Eureka.Zones.Pagos)}
                    </Typography>{" "}
                  </Card>
                </ListItem>
              );
            }
            return rows;
          })()}
        </List>

        <Title text={Eureka.Zones.Pyros} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {(() => {
            const rows = [];
            for (let i = 0; i < PyrosWeatherList.length; i++) {
              rows.push(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={Eureka.WeatherIcons[PyrosWeatherList[i]]}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={PyrosWeatherList[i]}
                    // secondary={Object.values(Animals)[i]["loot"]}
                    secondaryTypographyProps={{ sx: { color: "inherit" } }}
                  />
                  <Card variant="outlined" sx={{ p: 1, fontFamily: "inherit" }}>
                    <Typography variant="body2">
                      {getWeatherForecast(PyrosWeatherList[i], Eureka.Zones.Pyros)}
                    </Typography>{" "}
                  </Card>
                </ListItem>
              );
            }
            return rows;
          })()}
        </List>

        <Title text={Eureka.Zones.Hydatos} />
        <List sx={{ width: "100%", color: "inherit" }}>
          {(() => {
            const rows = [];
            for (let i = 0; i < HydatosWeatherList.length; i++) {
              rows.push(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={Eureka.WeatherIcons[HydatosWeatherList[i]]}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={HydatosWeatherList[i]}
                    // secondary={Object.values(Animals)[i]["loot"]}
                    secondaryTypographyProps={{ sx: { color: "inherit" } }}
                  />
                  <Card variant="outlined" sx={{ p: 1, fontFamily: "inherit" }}>
                    <Typography variant="body2">
                      {getWeatherForecast(HydatosWeatherList[i], Eureka.Zones.Hydatos)}
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
