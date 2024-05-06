import { useEffect, useState } from "react";

const pvpMaps = {
  0: "Onsal Hakair (Danshig Naadam)",
  1: "Seal Rock (Seize)",
  2: "The Fields of Glory (Shatter)",
};

export default function Frontlines() {
  const [isMounted, setIsMounted] = useState(false);
  const [mapNow, setMapNow] = useState("･･･");
  const [mapNext, setMapNext] = useState("･･･");
  const [remainingTime, setRemainingTime] = useState("");

  // Base date is on May 1, Seal Rock
  const baseDate = new Date("May 1, 2024 23:00:00");

  // Tomorrow 11PM
  const nextMapReset = new Date();
  nextMapReset.setDate(nextMapReset.getDate() + 1);
  nextMapReset.setHours(23);
  nextMapReset.setMinutes(0);
  nextMapReset.setSeconds(0);

  const mapsCount = Object.keys(pvpMaps).length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMap();
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  function getMap() {
    // Get how many days has passed since the base date
    let dateDiff = Math.floor((nextMapReset - baseDate) / (24 * 60 * 60 * 1000));

    var index = 0;
    for (let i = 0; i < dateDiff; i++) {
      index += 1;
      if (index > Object.keys(pvpMaps).length) {
        index = 0;
      }
    }

    let mapNext = index + 1 >= Object.keys(pvpMaps).length ? 0 : index + 1;

    setMapNow(pvpMaps[index]);
    setMapNext(pvpMaps[mapNext]);
  }

  function getRemainingTime() {
    let remainingHr =
      Math.floor(new Date(nextMapReset - new Date()).getTime() / (1000 * 60 * 60)) % 24;
    let remainingMn = Math.floor(new Date(nextMapReset - new Date()).getTime() / (1000 * 60)) % 60;
    let remainingSc = Math.floor(new Date(nextMapReset - new Date()).getTime() / 1000) % 60;
    return `${String(remainingHr).padStart(2, "0")}:${String(remainingMn).padStart(
      2,
      "0"
    )}:${String(remainingSc).padStart(2, "0")}`;
  }

  return (
    <div>
      <div className="section">
        <img src="/icons/PvP/pvp.png" className="sectionTitleImage" />
        PvP Frontlines
      </div>
      <div>
        <img src="/icons/PvP/pvp_current.png" className="sectionTitleImage" />
        <b>{mapNow}</b> ends in <b>{remainingTime}</b>
      </div>
      <div>Next: {mapNext}</div>
    </div>
  );
}
