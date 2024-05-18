import DisabledByDefaultSharpIcon from "@mui/icons-material/DisabledByDefaultSharp";
import SquareSharpIcon from "@mui/icons-material/SquareSharp";
import { Button, Checkbox, Container } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";
import style from "./FauxHallow.module.css";
import Set_1 from "./set_1";
import Set_2 from "./set_2";
import Set_3 from "./set_3";
import Set_4 from "./set_4";
import Set_5 from "./set_5";
import Set_6 from "./set_6";

const setsList = [
  // Set A
  "000000001010010000000000001000000001", // 0
  "000000000100010010000000000010100000", // 1
  "100000000100000000000010010100000000", // 2
  "000001010000000000010010001000000000", // 3
  // Set B
  "000100000000010010000100000000001000", // 4
  "000000000100100000001001000100000000", // 5
  "000100000000001000010010000000001000", // 6
  "000000001000100100000001001000000000", // 7
  // Set C
  "000010010000000100000000010000000100", // 8
  "000000010010000000100100000001000000", // 9
  "001000000010000000001000000010010000", // 10
  "000000100000001001000000010010000000", // 11
  // Set D
  "000000010000000010100000000100001000", // 12
  "001000000010100000010000000100000000", // 13
  "000100001000000001010000000010000000", // 14
  "000000001000000010000001010000000100", // 15
];

function Home({ theme, setTheme }) {
  const [checked, setChecked] = useState(new Array(36).fill(false));
  const [matchedPattern, setMatchedPattern] = useState();
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
          sx={{ margin: "-0.4rem" }}
          disableTouchRipple
          disableRipple
          icon={<SquareSharpIcon />}
          checkedIcon={<DisabledByDefaultSharpIcon />}
          value={i}
          onClick={(e) => selectedCellHandler(e)}
        />
      );
    }
    return <div className={style.printedContainer}>{boxes}</div>;
  };

  // Check which pattern matches the user input
  const getPattern = (pattern) => {
    var convertedPattern = "";

    pattern.map((i) => {
      convertedPattern += i == true ? "1" : "0";
    });

    setsList.forEach((set, i) => {
      if (set.replace(/\s/g, "") == convertedPattern) {
        setMatchedPattern(i);
      }
    });

    console.log(`Matched pattern is Pattern ${matchedPattern + 1}`);

    switch (matchedPattern) {
      case 0:
        setFoundMatch(Set_1);
        break;
      case 1:
        setFoundMatch(Set_2);
        break;
      case 2:
        setFoundMatch(Set_3);
        break;
      case 3:
        setFoundMatch(Set_4);
        break;
      case 4:
        setFoundMatch(Set_5);
        break;
      case 5:
        setFoundMatch(Set_6);
        break;
      default:
        setFoundMatch(null);
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
