import { Container } from "@mui/material";
import { useEffect } from "react";
import { getCurrentEorzeaTime } from "../utils/EorzeaClock";
import Header from "./Header";
import Navigation from "./Navigation";

export default function IslandSanctuary() {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 8, pb: 3 }}>
        Under Construction. {getCurrentEorzeaTime()}
      </Container>
    </>
  );
}
