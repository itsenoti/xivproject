import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import Title from "../components/title";
import Header from "./Header";
import Navigation from "./Navigation";

function Gathering({ theme, setTheme }) {
  var itemsToGatherList = ["Bayberry", "Prismstone"];
  const [itemId, setItemId] = useState(0);
  const [items, setItems] = useState(loadItems());
  const [itemIcon, setItemIcon] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemGatheringItemId, setItemGatheringItemId] = useState(0);
  const [itemGatheringType, setItemGatheringType] = useState(null);
  const [itemPlaceName, setItemPlaceName] = useState(null);

  var itemsToGatherList = ["Bayberry", "Prismstone"];

  useEffect(() => {
    const garlandtools = require("garlandtools-api");

    for (let i = 0; i < itemsToGatherList.length; i++) {
      garlandtools.search(itemsToGatherList[i]).then((resp) => {
        // items.push(resp[0]["obj"]["n"]);
      });
    }
  }, []);

  async function loadItems() {
    const garlandtools = require("garlandtools-api");
    var rows = [];
    for (let i = 0; i < itemsToGatherList.length; i++) {
      await garlandtools.search(itemsToGatherList[i]).then((resp) => {
        rows.push(resp[0]["obj"]["n"]);
      });
    }
    return rows;
  }

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={"Gathering"} />
        <Stack spacing={2} direction="row">
          {/* {items.map((item) => (
            <span>{item}</span>
          ))} */}
          {items.length}
        </Stack>
      </Container>
    </>
  );
}

export default Gathering;
