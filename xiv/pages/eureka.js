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
import EUREKA from "../pages/api/foray.json";
import styles from "../pages/styles/Eureka.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import {
  convertEorzeanTimeToLocalTime,
  getHourWeatherChanges,
  getTimeDifference_Hour,
  getTimeDifference_Minute,
  getWeatherByZone,
} from "./api/utilities";

function getTimeRemaining(zoneObj, currentTime) {
  var hr;
  var mn;
  if (new Date() >= zoneObj.LT_Start) {
    hr = getTimeDuration(zoneObj.LT_End, currentTime, "hr");
    mn = getTimeDuration(zoneObj.LT_End, currentTime, "min");

    if (hr == 0 && mn == 0) return null;

    return (
      <>
        <span className={styles.activeWeather}>
          ends in {hr} {mn}
        </span>
      </>
    );
  } else {
    hr = getTimeDuration(zoneObj.LT_Start, currentTime, "hr");
    mn = getTimeDuration(zoneObj.LT_Start, currentTime, "min");

    if (hr == 0 && mn == 0) return null;

    return `starts in ${hr} ${mn}`;
  }
}

function getTimeDuration(futureTime, currentTime, unit) {
  if (unit == "hr") {
    return getTimeDifference_Hour(futureTime, currentTime) > 0
      ? `${getTimeDifference_Hour(futureTime, currentTime)} ${unit}`
      : "";
  } else {
    return getTimeDifference_Minute(futureTime, currentTime) > 0
      ? `${getTimeDifference_Minute(futureTime, currentTime)} ${unit}`
      : "";
  }
}

function Eureka_() {
  const [anemos, setAnemos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [pyros, setPyros] = useState([]);
  const [hydatos, setHydatos] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTracked, setCurrentTracked] = useState(EUREKA.Zones.Anemos);
  const [currentWeatherTracked, setCurrentWeatherTracked] = useState(EUREKA.Weather.Gales);

  var LIMIT = 50;

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

  var weather2Track = "";

  useEffect(() => {
    const interval = setInterval(() => {
      // updateZoneStatus(EUREKA.Zones.Anemos);
      // updateZoneStatus(EUREKA.Zones.Pagos);
      // updateZoneStatus(EUREKA.Zones.Pyros);
      // updateZoneStatus(EUREKA.Zones.Hydatos);
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

            const result = getTimeRemaining(zoneObj, currentTime);
            if (result) return result;
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

            const result = getTimeRemaining(zoneObj, currentTime);
            if (result) return result;
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

            const result = getTimeRemaining(zoneObj, currentTime);
            if (result) return result;
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

            const result = getTimeRemaining(zoneObj, currentTime);
            if (result) return result;
          }
        }
      }
    }
  }

  const output = (zone) => {
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
                        <Avatar src={EUREKA.WeatherIcons[m_weatherList[i]]}></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          zone === EUREKA.Zones.Anemos
                            ? AnemosSpawn[i]
                            : zone === EUREKA.Zones.Pagos
                            ? PagosSpawn[i]
                            : zone === EUREKA.Zones.Pyros
                            ? PyrosSpawn[i]
                            : HydatosSpawn[i]
                        }
                      />
                      <Card className={styles.timeCard}>
                        <Typography variant="body" className={styles.nextTimeOccurence}>
                          {mb_getWeatherForecast(zone, m_weatherList[i])}
                        </Typography>{" "}
                      </Card>
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
