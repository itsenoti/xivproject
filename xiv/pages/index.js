import { Container } from "@mui/material";
import { Inter } from "@next/font/google";
import { Announcements } from "../components/announcements";
import { Title } from "../components/title";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", pt: 1 }}>
        <Title text="Weather Forecast" />
        <Title text="Baldesion Arsenal" />
        <Title text="Logograms" />
      </Container>
    </>
  );
}
