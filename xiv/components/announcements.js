import { Alert } from "@mui/material";
import { useState } from "react";
// https://na.lodestonenews.com/news/maintenance/
function Announcements() {
  const [announcement, setAnnouncement] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndtime] = useState(null);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://na.lodestonenews.com/news/maintenance/current", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      setAnnouncement(result[0]["title"].slice(0, -9));
      var start = new Date(result[0]["start"]);
      start = start.toLocaleDateString("default", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      var end = new Date(result[0]["end"]);
      end = end.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      setStartTime(start);
      setEndtime(end);
    })
    .catch((error) => console.log("error", error));

  return (
    <>
      {announcement && (
        <Alert severity="warning">
          {announcement} - {startTime} until {endTime} (local time){" "}
        </Alert>
      )}
    </>
  );
}

export default Announcements;
