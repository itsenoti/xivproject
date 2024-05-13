import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation/Navigation";
import en_text from "../../model/lang/en.json";
import ja_text from "../../model/lang/ja.json";

const LANG = "en";
var TXT = "";

if (LANG == "en") {
  TXT = en_text.en;
} else if (LANG == "ja") {
  TXT = ja_text.ja;
}

function Crafting() {
  const [craftsList, setCraftsList] = useState([]);

  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        <div>
          <h1>Crafting</h1>
          <div>
            <TextField id="outlined-basic" label="" variant="outlined" />
            <Button variant="outlined">Add</Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Crafting;
