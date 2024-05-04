import { Container } from "@mui/material";
import Frontlines from "../utils/Frontlines";
import Header from "./Header";
import Maintenance from "./Maintenance/Maintenance";
import Navigation from "./Navigation";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Maintenance />
        <Frontlines />
      </Container>
    </>
  );
}

export default Home;
