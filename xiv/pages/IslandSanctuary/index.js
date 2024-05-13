import { Container } from "@mui/material";
import { useEffect } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { getCurrentEorzeaTime } from "../../utils/EorzeaClock";

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
