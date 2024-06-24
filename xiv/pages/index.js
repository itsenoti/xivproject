import { Container } from "@mui/material";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Events from "../sections/Events/Events";
import Frontlines from "../sections/Frontlines";
import Maintenance from "../sections/Maintenance/Maintenance";

import { Poppins } from "next/font/google";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container className={`containerBody ${Poppins.className}`}>
        <Maintenance />
        <Frontlines />
        <Events />
      </Container>
    </>
  );
}

export default Home;
