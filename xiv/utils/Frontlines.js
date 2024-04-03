import { useEffect, useState } from "react";

const pvpMaps = {
  0: "The Fields of Glory (Shatter)",
  1: "Seal Rock (Seize)",
  2: "Onsal Hakair (Danshig Naadam)",
};

export function GetTodayMap() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [mapNow, setMapNow] = useState("");

  const baseDate_TheFieldsOfGlory = new Date("March 31, 2024 23:00:00");
  const baseDate_OnsalHakair = new Date("April 1, 2024 23:00:00");
  const baseDate_SealRock = new Date("April 2, 2024 23:00:00");

  const baseDate = new Date("March 30, 2024 23:00:00");
  const nextMapReset = new Date();
  nextMapReset.setDate(nextMapReset.getDate() + 1);
  nextMapReset.setHours(23);
  nextMapReset.setMinutes(0);
  nextMapReset.setSeconds(0);

  const mapsCount = 3;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      getMap();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  function getMap() {
    var durationSinceBaseDate = Math.floor((nextMapReset - baseDate)/(1000*60*60*24));
    for (let parseNextDate = 0; parseNextDate <= durationSinceBaseDate; parseNextDate++) {
      for (let mapRotation = 0; mapRotation < mapsCount; mapRotation++) {
        baseDate.setDate(baseDate.getDate() + 1);
        if (baseDate == nextMapReset) break;
        setMapNow(pvpMaps[mapRotation]);
      }
      if (baseDate == nextMapReset) break;
    }
  }

  return <>{mapNow}</>;
}
