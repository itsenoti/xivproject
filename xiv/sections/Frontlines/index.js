import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatDate_MMM_DD_YYYY_HHMMSS } from "../../utils/TimeConverter";
import * as style from "./Frontlines.module.css";

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
    let currentTime = new Date();
    let remainingHr =
      Math.floor(new Date(nextMapReset - currentTime).getTime() / (1000 * 60 * 60)) % 24;
    let remainingMn = Math.floor(new Date(nextMapReset - currentTime).getTime() / (1000 * 60)) % 60;
    let remainingSc = Math.floor(new Date(nextMapReset - currentTime).getTime() / 1000) % 60;
    return `${String(remainingHr).padStart(2, "0")}:${String(remainingMn).padStart(
      2,
      "0"
    )}:${String(remainingSc).padStart(2, "0")}`;
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
    dailyReset.setHours(23);
    dailyReset.setMinutes(0);
    dailyReset.setSeconds(0);

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
    let mapNext = index + 1 >= Object.keys(pvpMaps).length ? index + 1 - 4 : index + 1;
    let mapNext2 = index + 2 >= Object.keys(pvpMaps).length ? index + 2 - 4 : index + 2;
    let mapNext3 = index + 3 >= Object.keys(pvpMaps).length ? index + 3 - 4 : index + 3;

    // Set active map
    setMapNow(pvpMaps[index]);

    // Set next map
    setMapNext(pvpMaps[mapNext]);
    setMapNext2(pvpMaps[mapNext2]);
    setMapNext3(pvpMaps[mapNext3]);
  }

  return (
    <div>
      <div className="section">Frontlines</div>
      <div className={style.frontlinesMapTimeActiveMap}>
        Ends in <span className={style.endTime}>{remainingTime}</span>
        <div>
          <span className={style.activeMap}>{mapNow}</span>
        </div>
      </div>
      <div className={style.frontlinesMapTime}>
        {nextmapdate2} <div>{mapNext}</div>
      </div>
      <div className={style.frontlinesMapTime}>
        {nextmapdate3}
        <div>{mapNext2}</div>
      </div>
      <div className={style.frontlinesMapTime}>
        {nextmapdate4}
        <div>{mapNext3}</div>
      </div>
    </div>
  );
}
