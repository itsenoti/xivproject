import { Container } from "@mui/material";
import Announcements from "../components/announcements";
import Title from "../components/title";
import Header from "./Header";
import Navigation from "./Navigation";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", pt: 8 }}>
        <Title text="Weather Forecast" />
        <Title text="Baldesion Arsenal" />
        <Title text="Logograms" />
      </Container>
    </>
  );
}

export default Home;
