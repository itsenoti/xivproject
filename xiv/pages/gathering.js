import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import Title from "../components/title";
import GIcons from "./../pages/api/gathering.json";
import * as ETClock from "./../utils/EorzeaClock";
import * as TextConvert from "./../utils/StringConverters";
import * as Data from "./api/data.json";
import Header from "./Header";
import Navigation from "./Navigation";
import style from "./styles/Gathering.module.css";

const TIME_UP = "00:00";
const garlandtools = require("garlandtools-api");

// Set language
// garlandtools.setLang("ja");

function Gathering({ theme, setTheme }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [items, setItems] = useState(new Map());
  const [searchString, setSearchString] = useState("");
  const [showHasSpawned, setShowHasSpawed] = useState(true);
  const [rows, setRows] = useState(() => {
    if (typeof window != "undefined") {
      if (window.localStorage.getItem("gatheringList")) {
        return JSON.parse(window.localStorage.getItem("gatheringList"));
      } else return new Map();
    }
  });
  const [currentDateTimeMs, setCurrentDateTimeMs] = useState(new Date().getTime());
  const [soundPlayed, setSoundPlayed] = useState(false);

  // If rows = not empty, load them
  if (rows) {
    loadItems();
  }

  async function loadItems(uiid = "") {
    for (let index = 0; index < Object.keys(rows).length; index++) {
      let tgtItem = (await garlandtools.search(Object.keys(rows)[index]))[0];

      if (tgtItem) {
        var itemName = tgtItem.obj.n;
        var tItem = tgtItem;

        tgtItem = await garlandtools.item(tgtItem.id);
        var nodes = tgtItem.item.nodes || 0;
        var nodeInfoList = {};

        for (let index = 0; index < nodes.length; index++) {
          let nodeDetails = [""];
          nodeDetails = (await garlandtools.node(nodes[index])).node;
          nodeInfoList[index] = {
            area: Data.locationIndex[nodeDetails.areaid].name,
            name: Data.locationIndex[nodeDetails.zoneid].name,
            type: nodeDetails.type,
            xcoord: nodeDetails.coords[0],
            ycoord: nodeDetails.coords[1],
            spawn1: nodeDetails.time?.[0],
            spawn2: nodeDetails.time?.[1],
            nodeType: nodeDetails.limitType,
          };
        }

        items[itemName] = {
          id: tItem.id,
          name: itemName,
          type: tItem.type,
          icon: tItem.obj.c,
        };
        items[itemName]["location"] = nodeInfoList;
        items[itemName]["description"] = tgtItem.item.description;
        items[itemName]["uiid"] = Object.keys(rows)[index];

        let icon = items[itemName]["icon"];
        let icon_dir =
          icon - (icon % 1000) < 100000 ? "0" + (icon - (icon % 1000)) : icon - (icon % 1000);
        icon = icon < 100000 ? "0" + icon : icon;
        icon = "https://xivapi.com/i/" + icon_dir + "/" + icon + ".png";

        items[itemName]["icon"] = icon;
      }
    }
  }

  useEffect(() => {
    let updateTime = setTimeout(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);

    return () => clearTimeout(updateTime);
  }, [currentDateTimeMs]);

  // Search field & button event handler
  const onSearchFieldChange = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  /**
   * @description Delete button action handler
   * @param {*} event
   */
  const onDeleteItemButtonClick = (event) => {
    event.preventDefault();

    delete rows[event.currentTarget.id];
    delete items[event.currentTarget.id];

    if (typeof window != "undefined") {
      window.localStorage.setItem("gatheringList", JSON.stringify(rows));
    }

    loadItems();
  };

  /**
   * @description Search button callback
   * @param {*} event
   *
   */
  const onSearchButtonClick = (event) => {
    event.preventDefault();
    if (searchString != "") {
      addRow(searchString);
    }
  };

  /**
   *
   * @param {*} obj
   * @returns row that contains info
   */
  function addRow(searchString) {
    let id = self.crypto.randomUUID();

    rows[TextConvert.cleanString(searchString)] = id;

    if (typeof window != "undefined") {
      window.localStorage.setItem("gatheringList", JSON.stringify(rows));
    }

    loadItems();
  }

  function getIcon(type, nodeType) {
    switch (nodeType) {
      case "Legendary":
        return GIcons["Icons"][type];
    }
  }

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ padding: 0, pt: 8 }}>
        <Title text={"Gathering"} />

        <Paper
          component="form"
          sx={{ p: "2px 0px", display: "flex", alignItems: "center", width: "100%" }}
        >
          <InputBase
            sx={{ ml: 1, mr: 1, flex: 1 }}
            placeholder="Track item"
            inputProps={{ "aria-label": "track item" }}
            onChange={onSearchFieldChange}
            className={style.input}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onSearchButtonClick}
          >
            <ManageSearchTwoToneIcon />
          </IconButton>
        </Paper>
        <Divider />
        <Stack spacing={2} direction="column">
          <List sx={{ width: "100%" }}>
            {(() => {
              var listAllETL48Hours = ETClock.get48HoursTimeEquivalanceList(items);
              var unsortedList = {};
              var entries = [];
              var itemsKeys = Object.keys(items);

              itemsKeys.forEach((key) => {
                let timesKeys = Object.keys(listAllETL48Hours);

                timesKeys.forEach((tKey) => {
                  var spawn_1 = `${ETClock.formatTime(items[key].location?.[0]?.spawn1)}:00`;
                  var spawn_2 = `${ETClock.formatTime(items[key].location?.[0]?.spawn2)}:00`;
                  if (listAllETL48Hours[tKey].et == spawn_1) {
                    unsortedList[listAllETL48Hours[tKey].lt + "_" + items[key].name] = items[key];
                  }

                  if (listAllETL48Hours[tKey].et == spawn_2) {
                    unsortedList[listAllETL48Hours[tKey].lt + "_" + items[key].name] = items[key];
                  }
                });
              });

              //  Sort list
              var sortedList = Object.entries(unsortedList)
                .sort(([keyA], [keyB]) => {
                  return keyA.localeCompare(keyB, undefined, { numeric: true });
                })
                .map(([key, prop]) => ({ [key]: prop }));

              // Count unqie keys that are actually displayed
              var k = Object.keys(unsortedList);
              var uniqueKeys = [];
              for (let i = 0; i < k.length; i++) {
                let splitKey = k[i].split("_")[1];
                uniqueKeys[splitKey] = i;
              }

              for (let i = 0; i < Object.keys(uniqueKeys).length; i++) {
                var obj = sortedList?.[i];
                if (obj) {
                  let objKeys = Object.keys(obj)[0];
                  var time = new Date(objKeys.split("_")[0]);
                  obj = obj[objKeys];

                  var randAnimation = Math.floor(Math.random() * 4);

                  // ********************************************************************************************** //

                  if (ETClock.getTimeRemaining(time)) {
                    let __item__ = (
                      <Stack
                        width={"100%"}
                        spacing={1}
                        className={
                          time <= new Date()
                            ? style.spawned
                            : randAnimation == 0
                            ? style.notSpawned1
                            : randAnimation == 1
                            ? style.notSpawned2
                            : randAnimation == 2
                            ? style.notSpawned3
                            : style.notSpawned4
                        }
                      >
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <>
                              <span className={style.timer}>{ETClock.getTimeRemaining(time)}</span>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                id={obj.uiid}
                                onClick={onDeleteItemButtonClick}
                                sx={{ color: "var(--light-color)" }}
                              >
                                <RemoveCircleOutlineIcon sx={{ color: "indianred" }} />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar src={obj.icon} variant="rounded" className={style.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <span className={style.itemNameArea}>
                                  <Image
                                    src={getIcon(obj.location[0].type, obj.location[0].nodeType)}
                                    width={25}
                                    height={25}
                                    className={style.locationType}
                                  />
                                  <span className={style.itemName}>{obj.name}</span>
                                </span>
                              </>
                            }
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  <span className={style.location}>
                                    {obj.location[0]?.xcoord ? (
                                      <>
                                        {/* <img
                                          src="/icons/Others/060959_hr1.png"
                                          width="20px"
                                          height="20px"
                                          className={style.aetheryte}
                                        /> */}
                                        {obj.location[0].name} ▸ x:
                                        {obj.location[0].xcoord}, y:{obj.location[0].xcoord}
                                        {/* (
                                        {time.toLocaleString("default", {
                                          month: "short",
                                          day: "2-digit",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                        ) */}
                                      </>
                                    ) : (
                                      "Cannot be gathered by normal means."
                                    )}
                                  </span>
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </Stack>
                    );
                    entries.push(__item__);
                  }

                  // ********************************************************************************************** //
                }
              }

              return entries;
            })()}
          </List>
        </Stack>
      </Container>
    </>
  );
}

export default Gathering;
