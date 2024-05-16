import { Button, Checkbox, Container } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";
import style from "./FauxHallow.module.css";
import Set_1 from "./set_1";

const setsList = [
  "000000001010010000000000001000000001",
  "000000000100010010000000000010100000",
  "100000000100000000000010010100000000",
  "000001010000000000010010001000000000",
  "000100000000010010000100000000001000",
  "000000000100100000001001000100000000",
  "000100000000001000010010000000001000",
  "000000001000100100000001001000000000",
  "000010010000000100000000010000000100",
  "000000010010000000100100000001000000",
  "001000000010000000001000000010010000",
  "000000100000001001000000010010000000",
  "000000010000000010100000000100001000",
  "001000000010100000010000000100000000",
  "000100001000000001010000000010000000",
  "000000001000000010000001010000000100",
];

function Home({ theme, setTheme }) {
  const [checked, setChecked] = useState(new Array(36).fill(false));
  const [foundMatch, setFoundMatch] = useState();

  const selectedCellHandler = (e) => {
    const updateCheckmarks = checked.map((item, index) => (index == e.target.value ? !item : item));
    setChecked(updateCheckmarks);
  };

  // Generate the checkboxes
  const printout = () => {
    var boxes = [];
    for (let i = 0; i < 36; i++) {
      boxes.push(
        <Checkbox
          className={style.fauxHallowCell}
          value={i}
          onClick={(e) => selectedCellHandler(e)}
        />
      );
    }
    return <div className={style.printedContainer}>{boxes}</div>;
  };

  // Check which pattern matches the user input
  const getPattern = (pattern) => {
    var matchedPattern = 0;
    var convertedPattern = "";

    pattern.map((i) => {
      convertedPattern += i == true ? "1" : "0";
    });

    setsList.forEach((set, i) => {
      if (set.replace(/\s+/, "") == convertedPattern) matchedPattern = i;
    });

    switch (matchedPattern) {
      case 1:
        setFoundMatch(Set_1);
        break;
      default:
        setFoundMatch(Set_1);
        break;
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        <Title text="Faux Hallow" />
        Select disabled cells:
        {printout()}
        <Button onClick={(e) => getPattern(checked)}>Get Pattern</Button>
        <div>{foundMatch}</div>
      </Container>
    </>
  );
}

export default Home;
