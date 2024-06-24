import { Container } from "@mui/material";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";
import WhiteScrip from "./WhiteScrip";

function Resources() {
  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        <Title text="Resources" />
        <WhiteScrip />
      </Container>
    </>
  );
}

export default Resources;
