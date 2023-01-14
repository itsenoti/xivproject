import { Container, List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import Title from "../components/title";
import Header from "./Header";
import Navigation from "./Navigation";

import * as ETClock from "./../utils/EorzeaClock";
import * as Data from "./api/data.json";
import style from "./styles/Gathering.module.css";

const garlandtools = require("garlandtools-api");

function Gathering({ theme, setTheme }) {
  var itemsToGatherList = [
    "Bayberry",
    "Prismstone",
    "Royal Grapes",
    "Paldao Log",
    "Ilmenite",
    "Rime Dolomite",
    "Blue Quartz",
    "Ash Diatomite",
  ];
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentDateTimeMs, setCurrentDateTimeMs] = useState(new Date().getTime());

  useEffect(() => {
    async function loadItems(index) {
      let ids = (await garlandtools.search(itemsToGatherList[index]))[0].id;
      let it = await garlandtools.item(ids);

      let gather = await garlandtools.node(it.item.nodes);
      let zone = Data.locationIndex[gather.node.zoneid].name;

      var icon = parseInt(it.item.icon);
      icon = icon - (icon % 1000);
      var time1 = 0;
      var time2 = 0;
      if (icon < 100000) {
        icon = "https://xivapi.com/i/0" + icon + "/0" + it.item.icon + ".png";
      } else {
        icon = "https://xivapi.com/i/" + icon + "/" + it.item.icon + ".png";
      }

      if (gather.node.time) time1 = gather.node.time[0];
      if (gather.node.time) time2 = gather.node.time[1];

      setItems((prev) => [
        ...prev,
        [
          it.item.name,
          icon,
          gather.node.coords[0],
          gather.node.coords[1],
          gather.node.name,
          time1,
          time2,
          zone,
        ],
      ]);
    }

    for (let index = 0; index < itemsToGatherList.length; index++) {
      loadItems(index);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);
  }, [currentDateTimeMs]);

  if (isLoading) {
    return (
      <>
        <Header />
        <Navigation />
        <Announcements />
        <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
          <Title text={"Gathering"} />
          <Stack spacing={2} direction="row">
            Loading...
          </Stack>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
        <Title text={"Gathering"} />
        <Stack spacing={2} direction="row">
          <List>
            {(() => {
              items.sort();
              var rows = [];
              for (const key in items) {
                let row = (
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid>
                        <img src={items[key][1]} />
                        {/* <Image
                          loader={() => items[key][1]}
                          src={items[key][1]}
                          width={40}
                          height={40}
                        /> */}
                      </Grid>
                      <Grid className={style.details} sx={{ width: "17rem", fontSize: "0.85rem" }}>
                        <div>{items[key][0]}</div>
                        <div>
                          {items[key][7]} (X:{items[key][2]},Y:{items[key][3]})
                        </div>
                      </Grid>
                      <Grid className={style.time} sx={{ width: "5rem" }}>
                        {ETClock.lt_getRemainingTimeBeforeSpawn(items[key][5], items[key][6])}
                      </Grid>
                    </Grid>
                  </Stack>
                );
                rows.push(row);
              }
              return rows;
            })()}
          </List>
        </Stack>
      </Container>
    </>
  );
}

export default Gathering;
