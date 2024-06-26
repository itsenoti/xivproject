import { Container, ListItemButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={"Links"} />
        <List>
          <ListItem alignItems="flex-start">
            <ListItemButton
              component="a"
              target="_blank"
              href="https://twitter.com/workshopparrot?lang=en'"
            >
              <ListItemText
                primary="Polar Parrot"
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" className="text-pink-700">
                      Best recommmendations for daily Island Sanctuary agendas!
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemButton component="a" target="_blank" href="https://garlandtools.org/db/">
              <ListItemText
                primary="Garland Tools"
                secondary={
                  <React.Fragment>
                    <Typography variant="caption">An unofficial FFXIV database</Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>

          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemButton component="a" target="_blank" href="http://heavenswhere.com/">
              <ListItemText
                primary="Heavenswhere"
                secondary={
                  <React.Fragment>
                    <Typography variant="caption">
                      Guide in locating daily hunt marks, sightseeing vistas, treasure maps
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>

          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemButton component="a" target="_blank" href="https://ffxivhunt.com">
              <ListItemText
                primary="XIVHunt"
                secondary={
                  <React.Fragment>
                    <Typography variant="caption">
                      Guide in locating daily and weekly hunt marks
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </>
  );
}

export default Home;
