import { Container } from "@mui/material";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Frontlines from "../sections/Frontlines";
import Maintenance from "../sections/Maintenance/Maintenance";
import OceanFishing from "../sections/OceanFishing";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container className={`containerBody`}>
        <Maintenance />
        <Frontlines />
        <OceanFishing />
        {/* <Events /> */}
      </Container>
    </>
  );
}

export default Home;
