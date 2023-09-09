import {
  Avatar,
  Card,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import Title from "../components/title";
import CONSTANT from "../pages/api/constants.json";
import EUREKA from "../pages/api/foray.json";
import styles from "../pages/styles/Eureka.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import {
  convertEorzeanTimeToLocalTime,
  getHourWeatherChanges,
  getWeatherByZone,
} from "./api/utilities.js";

/**
 *
 * @param {*} weatherToTrack Weather that spawns speacial NM
 * @param {*} zone Which Eurekan area to inquiry
 * @param {*} currentLocalTime Earth Time
 * @returns Earth time that the weather happens in
 */
function mb_getWeatherForecast(weatherToTrack = "", zone = "", currentLocalTime) {
  var list_EorzeanTime = [];
  var list_LocalTime = [];
  var weather_anemos = [];
  var weather_pagos = [];
  var weather_pyros = [];
  var weather_hydatos = [];
  var remainingHr = 0;
  var remainingMn = 0;
  var hrNotif = "";
  var mnNotif = "";
  var date = null;

  for (let i = 0; i < 100; i++) {
    list_EorzeanTime[i] = getHourWeatherChanges(i);
    list_LocalTime[i] = convertEorzeanTimeToLocalTime(i);

    weather_anemos[i] = getWeatherByZone(i, EUREKA.Zones.Anemos);
    weather_pagos[i] = getWeatherByZone(i, EUREKA.Zones.Pagos);
    weather_pyros[i] = getWeatherByZone(i, EUREKA.Zones.Pyros);
    weather_hydatos[i] = getWeatherByZone(i, EUREKA.Zones.Hydatos);
  }

  for (let i = 0; i < 100; i++) {
    if (
      (zone == EUREKA.Zones.Anemos &&
        weatherToTrack == weather_anemos[i] &&
        (list_EorzeanTime[i] == "00:00" || list_EorzeanTime[i] == "16:00")) ||
      (zone == EUREKA.Zones.Pagos && weatherToTrack == weather_pagos[i]) ||
      (zone == EUREKA.Zones.Pyros && weatherToTrack == weather_pyros[i]) ||
      (zone == EUREKA.Zones.Hydatos && weatherToTrack == weather_hydatos[i])
    ) {
      date = new Date(list_LocalTime[i]);

      if (currentLocalTime < date.getTime()) {
        let m_relTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" }).formatToParts(
          (date.getTime() - currentLocalTime) / CONSTANT.ONE_MINUTE,
          "minute"
        );

        if (m_relTime[1]?.value !== undefined) remainingHr = Math.floor(m_relTime[1].value / 60);
        if (m_relTime[1]?.value !== undefined) remainingMn = Math.floor(m_relTime[1].value % 60);

        if (weather_hydatos[0] === weatherToTrack) {
          return `now`;
        } else {
          hrNotif =
            remainingHr > 1 ? `${remainingHr} hrs` : remainingHr > 0 ? `${remainingHr} hr` : "";
          mnNotif =
            remainingMn > 1 ? `${remainingMn} min` : remainingMn > 0 ? `${remainingMn} min` : "";

          return `in ${hrNotif} ${mnNotif}`;
        }
      }
    }
  }
}

function Eureka_() {
  const [time, setTime] = useState(new Date().getTime());
  useEffect(() => {
    setTimeout(function () {
      setTime(new Date().getTime());
    }, CONSTANT.ONE_MINUTE);
  }, [time]);

  // These are the weathers needed to track
  var AnemosWeatherList = ["Gales"];
  var PagosWeatherList = ["Blizzards", "Fog"];
  var PyrosWeatherList = ["Heat Waves"];
  var HydatosWeatherList = ["Gloom", "Thunder"];

  const output = (zone) => {
    return (
      <>
        <Box className={styles.zoneForecast}>
          <Title text={zone} />
          <List sx={{ width: "100%", color: "inherit" }}>
            {(() => {
              const rows = [];
              var m_weatherList =
                zone === EUREKA.Zones.Anemos
                  ? AnemosWeatherList
                  : zone === EUREKA.Zones.Pagos
                  ? PagosWeatherList
                  : zone === EUREKA.Zones.Pyros
                  ? PyrosWeatherList
                  : HydatosWeatherList;

              for (let i = 0; i < m_weatherList.length; i++) {
                rows.push(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={EUREKA.WeatherIcons[m_weatherList[i]]}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={m_weatherList[i]} />
                    <Card sx={{ width: "11rem", p: 1, fontFamily: "inherit", textAlign: "center" }}>
                      <Typography variant="body" className={styles.nextTimeOccurence}>
                        {mb_getWeatherForecast(m_weatherList[i], zone, time)}
                      </Typography>{" "}
                    </Card>
                  </ListItem>
                );
              }
              return rows;
            })()}
          </List>
        </Box>
      </>
    );
  };

  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Box component="div" className={styles.ContainerBox}>
          {output(EUREKA.Zones.Anemos)}
          {output(EUREKA.Zones.Pagos)}
          {output(EUREKA.Zones.Pyros)}
          {output(EUREKA.Zones.Hydatos)}
        </Box>
      </Container>
    </>
  );
}

export default Eureka_;
