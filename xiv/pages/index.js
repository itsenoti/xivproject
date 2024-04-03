import HandymanIcon from "@mui/icons-material/Handyman";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import GetCurrentDate from "../utils/CurrentDate";
import { GetTodayMap } from "../utils/Frontlines";
import Header from "./Header";
import Navigation from "./Navigation";

import Link from "next/link";
import styles from "./styles/Index.module.css";

function Home({ theme, setTheme }) {
  const [title, setTitle] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [url, setUrl] = useState(null);

  const router = useRouter();

  // const { timeZone } = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timeZone = new Date().toTimeString().slice(9, 17);

  var date;

  const newsUrl = "https://lodestonenews.com/news/maintenance/current?locale=na";

  function getAnnouncements() {
    fetch(newsUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(Object.values(responseData["game"]) == "");
        if (Object.values(responseData["game"]) != "") {
          setTitle(responseData["game"][0]["title"].slice(0, 22));
          // setTitle(responseData["game"][0]["title"].slice(0, -9));
          setUrl(responseData["game"][0]["url"]);
          date = new Date(responseData["game"][0]["start"]);
          setStartTime(
            date.toLocaleString("default", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          date = new Date(responseData["game"][0]["end"]);
          setEndTime(
            date.toLocaleString("default", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setUrl(responseData["game"][0]["url"]);
        } else {
          // Redirect to this page if there are no news
          // router.push("/eureka");
        }
      });
    return;
  }

  useEffect(() => {
    getAnnouncements();
  });

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <div>
          <h2>Frontlines</h2>
          Current map is {GetTodayMap()}
        </div>
        <div>
          <h2>Maintenance</h2>
          No scheduled maintenance.
        </div>
        {title && (
          <Card sx={{}}>
            <CardContent>
              <div className={styles.titleContainer}>
                <div>
                  <HandymanIcon className={styles.titleIcon} />
                </div>
                <div className={styles.titleText}>{title}</div>
              </div>
              <Typography variant="body2" color="text.secondary" className="maintenanceSchedule">
                <code className={styles.maintenanceTime}>{startTime}</code> ({timeZone}) until{" "}
                <code className={styles.maintenanceTime}>{endTime}</code> ({timeZone})
              </Typography>
              <br />
              <Link href={url} target="_blank">
                Details
              </Link>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        )}
      </Container>
    </>
  );
}

export default Home;
