import { Container } from "@mui/material";
import List from "@mui/material/List";
import Link from "next/link";
import React from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";

function Home({ theme, setTheme }) {
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={""} />
        <List>
          <Link href="/maps/g15">G15地図座標</Link>{" "}
        </List>
      </Container>
    </>
  );
}

export default Home;
