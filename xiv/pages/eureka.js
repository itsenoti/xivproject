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
  getTimeDifference_Hour,
  getTimeDifference_Minute,
  getWeatherByZone,
} from "./api/utilities";

/**
 *
 * @param {*} weatherToTrack Weather that spawns speacial NM
 * @param {*} zone Which Eurekan area to inquiry
 * @param {*} currentLocalTime_ms Earth Time (ms format)
 * @returns Earth time that the weather happens in
 */
function mb_getWeatherForecast(weatherToTrack = "", zone = "", currentLocalTime_ms) {
  const [anemos, setAnemos] = useState({
    ET: getHourWeatherChanges(0),
    LT_Start: convertEorzeanTimeToLocalTime(0),
    LT_End: convertEorzeanTimeToLocalTime(0 + 1),
    Anemos: getWeatherByZone(0, EUREKA.Zones.Anemos),
  });
  const [pagos, setPagos] = useState({
    ET: getHourWeatherChanges(0),
    LT_Start: convertEorzeanTimeToLocalTime(0),
    LT_End: convertEorzeanTimeToLocalTime(0 + 1),
    Pagos: getWeatherByZone(0, EUREKA.Zones.Pagos),
  });
  const [pyros, setPyros] = useState({
    ET: getHourWeatherChanges(0),
    LT_Start: convertEorzeanTimeToLocalTime(0),
    LT_End: convertEorzeanTimeToLocalTime(0 + 1),
    Pyros: getWeatherByZone(0, EUREKA.Zones.Pyros),
  });
  const [hydatos, setHydatos] = useState({
    ET: getHourWeatherChanges(0),
    LT_Start: convertEorzeanTimeToLocalTime(0),
    LT_End: convertEorzeanTimeToLocalTime(0 + 1),
    Hydatos: getWeatherByZone(0, EUREKA.Zones.Hydatos),
  });

  var LIMIT = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      if (zone === EUREKA.Zones.Anemos) {
        for (let i = 0; i < LIMIT; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Anemos) &&
            (getHourWeatherChanges(i) == CONSTANT.DAWN ||
              getHourWeatherChanges(i) == CONSTANT.DUSK) &&
            new Date() < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            setAnemos({
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Anemos: getWeatherByZone(i, EUREKA.Zones.Anemos),
            });
            break;
          }
        }
      } else if (zone === EUREKA.Zones.Pagos) {
        for (let i = 0; i < LIMIT; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Pagos) &&
            new Date() < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            setPagos({
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Pagos: getWeatherByZone(i, EUREKA.Zones.Pagos),
            });
            break;
          }
        }
      } else if (zone === EUREKA.Zones.Pyros) {
        for (let i = 0; i < LIMIT; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Pyros) &&
            new Date() < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            setPyros({
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Pyros: getWeatherByZone(i, EUREKA.Zones.Pyros),
            });
            break;
          }
        }
      } else if (zone === EUREKA.Zones.Hydatos) {
        for (let i = 0; i < LIMIT; i++) {
          if (
            weatherToTrack === getWeatherByZone(i, EUREKA.Zones.Hydatos) &&
            new Date() < convertEorzeanTimeToLocalTime(i + 1)
          ) {
            setHydatos({
              ET: getHourWeatherChanges(i),
              LT_Start: convertEorzeanTimeToLocalTime(i),
              LT_End: convertEorzeanTimeToLocalTime(i + 1),
              Hydatos: getWeatherByZone(i, EUREKA.Zones.Hydatos),
            });
            break;
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  var hr;
  var mn;

  switch (zone) {
    case EUREKA.Zones.Anemos:
      return getTimeSpawn(anemos, new Date());
    case EUREKA.Zones.Pagos:
      return getTimeSpawn(pagos, new Date());
    case EUREKA.Zones.Pyros:
      return getTimeSpawn(pyros, new Date());
    case EUREKA.Zones.Hydatos:
      return getTimeSpawn(hydatos, new Date());
  }
}

function getTimeSpawn(zoneObj, currentTime) {
  var hr;
  var mn;
  if (currentTime >= zoneObj.LT_Start) {
    hr = getTimeDuration(zoneObj.LT_End, currentTime, "hr");
    mn = getTimeDuration(zoneObj.LT_End, currentTime, "min");
    return (
      <span className={styles.activeWeather}>
        ends in {hr} {mn}
      </span>
    );
  } else {
    hr = getTimeDuration(zoneObj.LT_Start, currentTime, "hr");
    mn = getTimeDuration(zoneObj.LT_Start, currentTime, "min");
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

  var AnemosSpawn = ["Pazuzu"];
  var PagosSpawn = ["Copycat Cassie", "King Arthro"];
  var PyrosSpawn = ["Penthesilea"];
  var HydatosSpawn = ["Sprite (Logos Farming)", "Sprite (Logos Farming)"];

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
                          {mb_getWeatherForecast(m_weatherList[i], zone, time)}
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
