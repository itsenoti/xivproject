import {
  Avatar,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useEffect, useState } from "react";

import Title from "../../components/Title";

import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import EUREKA from "../api/foray.json";
import {
  convertEorzeanTimeToLocalTime,
  getHourWeatherChanges,
  getWeatherByZone,
} from "../api/utilities";

import styles from "./Eureka.module.css";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function getTimeRemaining(zoneObj, currentTime) {
  if (new Date() >= zoneObj.LT_Start) {
    return (
      <span className={styles.activeWeather}>
        ends in {getTimeDuration(zoneObj.LT_End, currentTime, "hr")}
      </span>
    );
  } else {
    return (
      <>
        <span className={styles.inactiveWeather}>
          starts in {getTimeDuration(zoneObj.LT_Start, currentTime, "hr")}
        </span>
      </>
    );
  }
}

function getTimeDuration(futureTime, currentTime, unit) {
  dayjs.extend(relativeTime);
  return dayjs(futureTime).fromNow(true);
}

function Eureka_() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // These are the weathers needed to track
  var AnemosWeatherList = ["Gales"];
  var PagosWeatherList = ["Blizzards", "Fog"];
  var PyrosWeatherList = ["Heat Waves"];
  var HydatosWeatherList = ["Gloom", "Thunder"];

  // Spawns
  var AnemosSpawn = ["Pazuzu"];
  var PagosSpawn = ["Copycat Cassie", "King Arthro"];
  var PyrosSpawn = ["Penthesilea"];
  var HydatosSpawn = ["Sprite (Logos Farming)", "Sprite (Logos Farming)"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   *
   * @param {*} weatherToTrack Weather that spawns speacial NM
   * @param {*} zone Which Eurekan area to inquiry
   * @returns Earth time that the weather happens in
   */
  function mb_getWeatherForecast(zone = "", weatherToTrack = "") {
    var zoneObj = {};
    switch (zone) {
      case EUREKA.Zones.Anemos: {
        for (let i = 0; ; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Anemos) &&
            (getHourWeatherChanges(i) === "00:00" || getHourWeatherChanges(i) === "16:00") &&
            currentTime < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            zoneObj = {
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Anemos: getWeatherByZone(i, EUREKA.Zones.Anemos),
            };

            return getTimeRemaining(zoneObj, currentTime);
          }
        }
      }
      case EUREKA.Zones.Pagos: {
        for (let i = 0; ; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Pagos) &&
            currentTime < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            zoneObj = {
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Pagos: getWeatherByZone(i, EUREKA.Zones.Pagos),
            };

            return getTimeRemaining(zoneObj, currentTime);
          }
        }
      }
      case EUREKA.Zones.Pyros: {
        for (let i = 0; ; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Pyros) &&
            currentTime < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            zoneObj = {
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Pyros: getWeatherByZone(i, EUREKA.Zones.Pyros),
            };

            return getTimeRemaining(zoneObj, currentTime);
          }
        }
      }
      case EUREKA.Zones.Hydatos: {
        for (let i = 0; ; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Hydatos) &&
            currentTime < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            zoneObj = {
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Hydatos: getWeatherByZone(i, EUREKA.Zones.Hydatos),
            };

            return getTimeRemaining(zoneObj, currentTime);
          }
        }
      }
    }
  }

  const ZoneSpawnRow = (zone) => {
    return (
      <>
        <Box className={styles.zoneForecast}>
          <Title text={zone} />
          <List className={styles.list}>
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

              if (m_weatherList) {
                for (let i = 0; i < m_weatherList.length; i++) {
                  rows.push(
                    <ListItem className={styles.weatherRow}>
                      <ListItemAvatar>
                        <Avatar
                          src={EUREKA.WeatherIcons[m_weatherList[i]]}
                          sx={{ width: "2rem", height: "2rem", marginRight: "-3" }}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography style={{ fontFamily: "inherit", marginLeft: "-1rem" }}>
                            {zone === EUREKA.Zones.Anemos
                              ? AnemosSpawn[i]
                              : zone === EUREKA.Zones.Pagos
                              ? PagosSpawn[i]
                              : zone === EUREKA.Zones.Pyros
                              ? PyrosSpawn[i]
                              : HydatosSpawn[i]}
                          </Typography>
                        }
                      />
                      <span className="italic">
                        {mb_getWeatherForecast(zone, m_weatherList[i])}
                      </span>
                    </ListItem>
                  );
                }
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
      <Container className={styles.container}>
        {ZoneSpawnRow(EUREKA.Zones.Anemos)}
        {ZoneSpawnRow(EUREKA.Zones.Pagos)}
        {ZoneSpawnRow(EUREKA.Zones.Pyros)}
        {ZoneSpawnRow(EUREKA.Zones.Hydatos)}
      </Container>
    </>
  );
}

export default Eureka_;
