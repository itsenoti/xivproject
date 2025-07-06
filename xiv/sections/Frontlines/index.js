import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatDate_MMM_DD_YYYY_HHMMSS } from "../../utils/TimeConverter";

import * as styles from "./Frontlines.module.css";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";

const pvpMaps = {
  0: "The Borderline Ruins (Secure)",
  1: "Seal Rock (Seize)",
  2: "The Fields of Glory (Shatter)",
  3: "Onsal Hakair (Danshig Naadam)",
};

export default function Frontlines() {
  const [isMounted, setIsMounted] = useState(false);
  const [mapNow, setMapNow] = useState("･･･");
  const [mapNext, setMapNext] = useState("･･･");
  const [mapNext2, setMapNext2] = useState("･･･");
  const [mapNext3, setMapNext3] = useState("･･･");
  const [remainingTime, setRemainingTime] = useState("");

  // Tomorrow 11PM
  const nextMapReset = new Date();
  nextMapReset.setDate(nextMapReset.getDate() + 1);
  nextMapReset.setHours(23, 0, 0);

  const nextmapdate2 = formatDate_MMM_DD_YYYY_HHMMSS(
    nextMapReset.setDate(nextMapReset.getDate() - 1)
  );
  const nextmapdate3 = formatDate_MMM_DD_YYYY_HHMMSS(
    nextMapReset.setDate(nextMapReset.getDate() + 1)
  );
  const nextmapdate4 = formatDate_MMM_DD_YYYY_HHMMSS(
    nextMapReset.setDate(nextMapReset.getDate() + 1)
  );

  const mapsCount = Object.keys(pvpMaps).length;

  const getRemainingTime = () => {
    const now = new Date();
    const diff = nextMapReset - now;

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      var dailyReset = getDailyReset();
      getMap(dailyReset);
      setRemainingTime(getRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  function getDailyReset() {
    let dailyReset = new Date();
    dailyReset.setHours(23, 0, 0);

    let dateNow = new Date();

    if (dateNow > dailyReset) {
      if (dateNow.getDate() == dailyReset.getDate()) {
        dailyReset.setDate(dailyReset.getDate() + 1);
      }
    }

    return dailyReset;
  }

  function getMap(dailyReset) {
    const baseDate = new Date("May 1, 2024 23:00:00");

    const dateNow = dayjs(new Date());

    var dateDiff = dateNow.diff(baseDate, "d", false);

    const MAP_1 = 0;

    var index = 0;

    var i = 0;

    for (i = MAP_1; i < dateDiff - 1; i++) {
      ++index;
      if (index == mapsCount) index = MAP_1;
    }

    // Get next map
    const length = Object.keys(pvpMaps).length;
    const mapNext = (index + 1) % length;
    const mapNext2 = (index + 2) % length;
    const mapNext3 = (index + 3) % length;

    // Set active map
    setMapNow(pvpMaps[index]);

    // Set next maps
    setMapNext(pvpMaps[mapNext]);
    setMapNext2(pvpMaps[mapNext2]);
    setMapNext3(pvpMaps[mapNext3]);
  }

  return (
    <>
      <div className="section">Frontlines</div>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
            margin: 0,
            marginLeft: -2,
            fontFamily: "Pretendard",
            fontSize: "1em",
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className={styles.timelineContent}>{mapNow}</div>
            <span className={styles.timelineContent}>Ends in {remainingTime}</span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={styles.timelineContent}>{mapNext}</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
          </TimelineSeparator>
          <TimelineContent className={styles.timelineContent}>{mapNext2}</TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
