import { useEffect, useState } from "react";

function CountDownTimer(props) {
  const [isMounted, setIsMounted] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getCountdown = (fromDate, toDate) => {
    let timeDifference = new Date(prop.to).getTime();
    let remainingHr = Math.floor((timeDifference / 1000) * 60 * 60) % 24;
    let remainingMn = Math.floor((timeDifference / 1000) * 60) % 60;
    let remainingSc = Math.floor(timeDifference / 1000) % 60;
    setRemainingTime(
      `${String(remainingHr).padStart(2, "0")}h 
       ${String(remainingMn).padStart(2, "0")}m 
       ${String(remainingSc).padStart(2, "0")}s`
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <span>{remainingTime}</span>;
}

export default CountDownTimer;
