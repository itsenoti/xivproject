import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as global from "../../pages/globals";
import { GetRelativeTime } from "../../utils/RelativeTime";
import style from "./Events.module.css";

function Events(props) {
  const [eventsCsv, setEventsCsv] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    getEventsFromGSheet();
  }, []);

  const getEventsFromGSheet = () => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTojVh3GJos-1iC3aTNpRux1VYC4Y-UnCmctKLpCHle0PLQZpG6IyDLUSTQSLhBbFPBXZfzfD1IU3E5/pub?gid=1732240865&single=true&output=csv";

    axios
      .get(url)
      .then((response) => {
        const data = parseEvents(response.data);
        setEventsCsv(data);
      })
      .catch((error) => {
        console.error("Error parsing CSV events data");
      });
  };

  return (
    <div>
      <div className="section">Events</div>
      {eventsCsv.map((event, i) => {
        if (new Date(event.StartDate) < new Date() && new Date(event.EndDate) > new Date()) {
          return (
            <>
              <div className={style.eventRow} key={i}>
                <Image
                  src={"https://lds-img.finalfantasyxiv.com/h/l/CtEfIrQAujxk3py5UKSnVlfOPI.svg"}
                  alt="image"
                  width={global.ICON_WIDTH}
                  height={global.ICON_HEIGHT}
                />
                <b>{event.EventName}</b> ends in {GetRelativeTime(event.EndDate)}
              </div>
            </>
          );
        }

        if (new Date(event.StartDate) > new Date()) {
          return (
            <>
              <div className={style.eventRowUpcoming} key={i}>
                {/* <Image src={"/icons/Events/upcoming.png"} alt="image" width={20} height={20} /> */}
                <b>{event.EventName}</b> starts in {GetRelativeTime(event.StartDate)}
              </div>
            </>
          );
        }
      })}
    </div>
  );
}

function parseEvents(eventsData) {
  const rows = eventsData.split(/\r?\n/);
  const headers = rows[0].split(",");
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(",");
    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = rowData[j];
    }
    data.push(rowObject);
  }
  return data;
}

export default Events;
