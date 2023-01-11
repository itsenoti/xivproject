import { Container } from "@mui/material";
import Announcements from "../components/announcements";
import * as Eorzea from "./../utils/EorzeaClock";
import Header from "./Header";
import Navigation from "./Navigation";

function Time({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>{Eorzea.convertToLT()}</Container>
    </>
  );
}

export default Time;
