import { Container } from "@mui/material";
import Frontlines from "../utils/Frontlines";
import Events from "./Events/Events";
import Header from "./Header";
import Maintenance from "./Maintenance/Maintenance";
import Navigation from "./Navigation/Navigation";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 9, pr: 1, pl: 1 }}>
        <Maintenance />
        <Frontlines />
        <Events />
      </Container>
    </>
  );
}

export default Home;
