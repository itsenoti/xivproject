import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import Header from "./Header";
import Navigation from "./Navigation";

function Home({ theme, setTheme }) {
  const [title, setTitle] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [url, setUrl] = useState(null);

  var date;

  const newsUrl = "https://lodestonenews.com/news/maintenance/current?locale=na";

  function getAnnouncements() {
    fetch(newsUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setTitle(responseData["game"][0]["title"].slice(0, -9));
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
      });
    return;
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        {title && (
          <Card sx={{}}>
            <CardMedia
              sx={{ height: 100 }}
              image="https://img.finalfantasyxiv.com/lds/h/V/LxdIbtYNrILWLB7Gojul6q7OZw.jpg"
              title="Maintenance"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {startTime} (GMT+8) until {endTime} (GMT+8)
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        )}
      </Container>
    </>
  );
}

export default Home;
