import { Container } from "@mui/material";
import React from "react";
import Title from "../../components/title";
import Announcements from "../components/announcements";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";
import styles from "./styles/Weather.module.css";

function Weather({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={"Weather Forecast"} />
        {getWeatherForecast_1000x()}
      </Container>
    </>
  );
}

function formatTime(time) {
  if (time < 10) return "0" + time;
  return time;
}

function getNewWeatherStartTimeMs() {
  var EPOCH = new Date().getTime() / 1000;
  var bell = (EPOCH / 175) % 24;
  var startBell = bell - (bell % 8);
  var startUnixSeconds = EPOCH - 175 * (bell - startBell);
  var newDate = new Date(startUnixSeconds * 1000).getTime();
  return newDate % 10 == 0 ? newDate : newDate + 1;
}

function getETHour(time) {
  var epoch = getNewWeatherStartTimeMs() / 1000 + 1400000 * (time - 1);
  return formatTime(Math.floor(epoch / 175) % 24) + ":00";
}

function convertETToLT(nextTime) {
  var lt = new Date(getNewWeatherStartTimeMs() + 1400000 * (nextTime - 1));
  return lt;
}

function getWeatherForecast_1000x() {
  var m_forecast = [];

  for (var i = 0; i < 999; i++) {
    m_forecast[i] = (
      <div>
        <span className={styles.timeEorzea}>{getETHour(i)}</span>
        <span>
          {new Intl.DateTimeFormat("en-PH", {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "2-digit",
            year: "numeric",
          }).format(convertETToLT(i))}
        </span>
      </div>
    );
  }

  return m_forecast;
  // return JSON.stringify(m_forecast, 2, null);
}

export default Weather;
