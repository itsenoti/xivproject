import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as style from "./Frontlines.module.css";

const pvpMaps = {
  0: "The Fields of Glory (Shatter)",
  1: "Onsal Hakair (Danshig Naadam)",
  2: "Seal Rock (Seize)",
};

export default function Frontlines() {
  const [isMounted, setIsMounted] = useState(false);
  const [mapNow, setMapNow] = useState("･･･");
  const [mapNext, setMapNext] = useState("･･･");
  const [remainingTime, setRemainingTime] = useState("");

  // Tomorrow 11PM
  const nextMapReset = new Date();
  nextMapReset.setDate(nextMapReset.getDate() + 1);
  nextMapReset.setHours(23);
  nextMapReset.setMinutes(0);
  nextMapReset.setSeconds(0);

  const mapsCount = Object.keys(pvpMaps).length;

  const getRemainingTime = () => {
    let remainingHr =
      Math.floor(new Date(nextMapReset - new Date()).getTime() / (1000 * 60 * 60)) % 24;
    let remainingMn = Math.floor(new Date(nextMapReset - new Date()).getTime() / (1000 * 60)) % 60;
    let remainingSc = Math.floor(new Date(nextMapReset - new Date()).getTime() / 1000) % 60;
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
    let mapNext = index + 1 == Object.keys(pvpMaps).length ? MAP_1 : index + 1;

    // Set active map
    setMapNow(pvpMaps[index]);

    // Set next map
    setMapNext(pvpMaps[mapNext]);
  }

  return (
    <div>
      <div className="section">Frontlines</div>
      <div>
        <Image
          src="/icons/PvP/pvp_current.png"
          className="sectionTitleImage"
          width={20}
          height={20}
          alt="ongoing pvp"
        />
        <span className={style.activeMap}>{mapNow}</span> ends in{" "}
        <span className={style.endTime}>{remainingTime}</span>
      </div>
      <div>Next: {mapNext}</div>
    </div>
  );
}
