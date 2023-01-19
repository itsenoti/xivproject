import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Announcements from "../components/announcements";
import Title from "../components/title";
import * as ETClock from "./../utils/EorzeaClock";
import * as Data from "./api/data.json";
import Header from "./Header";
import Navigation from "./Navigation";
import style from "./styles/Gathering.module.css";

import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import GIcons from "./../pages/api/gathering.json";

import * as TextConvert from "./../utils/StringConverters";

import Typography from "@mui/material/Typography";
const garlandtools = require("garlandtools-api");

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

  var sortedItemsFin = {};

  if (rows) {
    loadItems();
  }

  async function loadItems(uiid = "") {
    for (let index = 0; index < Object.keys(rows).length; index++) {
      let tgtItem = (await garlandtools.search(Object.keys(rows)[index]))[0];

      if (tgtItem) {
        var itemName = tgtItem.obj.n;
        items[itemName] = {
          id: tgtItem.id,
          name: itemName,
          type: tgtItem.type,
          icon: tgtItem.obj.c,
        };

        tgtItem = await garlandtools.item(tgtItem.id);

        items[itemName]["description"] = tgtItem.item.description;

        var nodes = tgtItem.item.nodes || 0;

        var nodeInfoList = {};

        for (let index = 0; index < nodes.length; index++) {
          let nodeDetails = [""];
          nodeDetails = (await garlandtools.node(nodes[index])).node;

          // console.log(`${itemName} ${JSON.stringify(nodeDetails, null, 3)}`);

          nodeInfoList[index] = {
            name: Data.locationIndex[nodeDetails.zoneid].name,
            type: nodeDetails.type,
            xcoord: nodeDetails.coords[0],
            ycoord: nodeDetails.coords[1],
            spawn1: nodeDetails.time?.[0],
            spawn2: nodeDetails.time?.[1],
            nodeType: nodeDetails.limitType,
          };
        }

        items[itemName]["location"] = nodeInfoList;

        let icon = items[itemName]["icon"];
        let icon_dir =
          icon - (icon % 1000) < 100000 ? "0" + (icon - (icon % 1000)) : icon - (icon % 1000);
        icon = icon < 100000 ? "0" + icon : icon;
        icon = "https://xivapi.com/i/" + icon_dir + "/" + icon + ".png";

        items[itemName]["icon"] = icon;

        items[itemName]["uiid"] = Object.keys(rows)[index];
      }
    }
  }

  useEffect(() => {
    let updateTime = setTimeout(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);
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

  const changeDisplayList = (event) => {
    event.preventDefault();
    setShowHasSpawed(!showHasSpawned);
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

  function getIcon(type) {
    return GIcons["Icons"][type];
  }

  function sortItems() {
    var newSorted = {};
    var sorted_spawned = {};

    var totalNodes = 0;
    var sortedItems = {};

    for (let index = 0; index < Object.keys(items).length; index++) {
      let item = Object.values(items)[index];
      let locationCount = Object.keys(item.location).length;

      if (locationCount) {
        for (let locationIndex = 0; locationIndex < locationCount; locationIndex++) {
          let loc = item.location?.[locationIndex];

          let s1 = loc.spawn1 < 10 ? 0 + loc.spawn1 : loc.spawn1;

          sortedItems[s1 + "_" + item.name] = {
            id: item.id,
            name: item.name,
            type: item.type,
            icon: item.icon,
            description: item.description,
            location_name: loc.name,
            location_type: loc.type,
            location_xcoord: loc.xcoord,
            location_ycoord: loc.ycoord,
            location_nodeType: loc.nodeType,
            location_time: loc.spawn1,
            uiid: item.uiid,
          };

          let s2 = loc.spawn2 < 10 ? 0 + loc.spawn2 : loc.spawn2;
          sortedItems[s2 + "_" + item.name] = {
            id: item.id,
            name: item.name,
            type: item.type,
            icon: item.icon,
            description: item.description,
            location_name: loc.name,
            location_type: loc.type,
            location_xcoord: loc.xcoord,
            location_ycoord: loc.ycoord,
            location_nodeType: loc.nodeType,
            location_time: loc.spawn2,
            uiid: item.uiid,
          };
        }
      }
    }

    //  Sort list
    var sortAlphaNumerically = Object.entries(sortedItems)
      .sort(([keyA], [keyB]) => {
        return keyA.localeCompare(keyB, undefined, { numeric: true });
      })
      .map(([key, prop]) => ({ [key]: prop }));

    var currentETHour = ETClock.getCurrentEorzeanHour();
    let dummyList = {};

    for (let index = 0; index < Object.keys(sortAlphaNumerically).length; index++) {
      let element = Object.keys(sortAlphaNumerically[index]);
      let content = Object.values(Object.values(sortAlphaNumerically)[index])[0];

      let itemName = content.name;
      let spawnTime_et = content.location_time;
      let spawnTime_lt = ETClock.convertETotLT(content.location_time);

      dummyList[spawnTime_et + "_" + itemName] = {
        name: content.name,
        type: content.type,
        icon: content.icon,
        spawnTime_et: content.location_time,
        spawnTime_lt: ETClock.convertETotLT(content.location_time).toLocaleString("default", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        location_name: content.location_name,
        location_type: content.location_type,
        location_xcoord: content.location_xcoord,
        location_ycoord: content.location_ycoord,
        location_nodeType: content.nodeType,
        uiid: content.uiid,
      };
    }

    return dummyList;
  }

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ height: "100vh", padding: 0, pt: 8 }}>
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
              var entries = [];
              var itemList = sortItems();
              for (let index = 0; index < Object.keys(itemList).length; index++) {
                var c = Object.values(itemList)[index];
                var end_time = c.spawnTime_et + 1 >= 24 ? c.spawnTime_et - 23 : c.spawnTime_et + 1;

                var hasSpawned =
                  ETClock.getCurrentEorzeanHour() >= c.spawnTime_et &&
                  ETClock.getCurrentEorzeanHour() <= end_time;
                var almostGone =
                  ETClock.lt_getRemainingTimeBeforeSpawn(c.spawnTime_et + 2) == "00:00"
                    ? true
                    : false;

                if (hasSpawned) {
                  var row = (
                    <Slide
                      direction="right"
                      in={hasSpawned && !almostGone}
                      mountOnEnter
                      unmountOnExit
                      {...(hasSpawned && !almostGone ? { timeout: 500 } : {})}
                    >
                      <Stack width={"100%"} spacing={1} className={style.spawned}>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              id={c.uiid}
                              onClick={onDeleteItemButtonClick}
                              sx={{ color: "var(--light-color)" }}
                            >
                              <DeleteForeverIcon sx={{ color: "white", opacity: "0.1" }} />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar src={c.icon} variant="rounded" className={style.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <span className={style.itemNameArea}>
                                  <span className={style.itemName}>{c.name}</span>
                                  <img src={getIcon(c.location_type)} width="30rem"></img>{" "}
                                </span>
                                <span className={style.timer}>
                                  {ETClock.lt_getRemainingTimeBeforeSpawn(c.spawnTime_et + 2)}
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
                                    {c.location_xcoord ? (
                                      <>
                                        {c.location_name} ▸ x:
                                        {c.location_xcoord}, y:{c.location_ycoord}
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
                    </Slide>
                  );
                  entries.push(row);
                }
              }

              for (let index = 0; index < Object.keys(itemList).length; index++) {
                var i = Object.keys(itemList)[index];
                var c = Object.values(itemList)[index];
                var end_time = c.spawnTime_et + 1 >= 24 ? c.spawnTime_et - 23 : c.spawnTime_et + 1;

                if (c.spawnTime_et > ETClock.getCurrentEorzeanHour()) {
                  var row = (
                    <Stack width={"100%"} spacing={1} className={style.notSpawned}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            id={c.uiid}
                            onClick={onDeleteItemButtonClick}
                            sx={{ color: "var(--light-color)" }}
                          >
                            <DeleteForeverIcon sx={{ color: "white", opacity: "0.1" }} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={c.icon} variant="rounded" className={style.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <span className={style.itemNameArea}>
                                <span className={style.itemName}>{c.name}</span>
                                <img src={getIcon(c.location_type)} width="30rem"></img>{" "}
                              </span>
                              <span className={style.timer}>
                                {ETClock.lt_getRemainingTimeBeforeSpawn(c.spawnTime_et)}
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
                                  {c.location_xcoord ? (
                                    <>
                                      {c.location_name} ▸ x:
                                      {c.location_xcoord}, y:{c.location_ycoord}
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
                  entries.push(row);
                }
              }

              for (let index = 0; index < Object.keys(itemList).length; index++) {
                var i = Object.keys(itemList)[index];
                var c = Object.values(itemList)[index];
                var end_time = c.spawnTime_et + 1 >= 24 ? c.spawnTime_et - 23 : c.spawnTime_et + 1;

                if (c.spawnTime_et < ETClock.getCurrentEorzeanHour()) {
                  var row = (
                    <Stack width={"100%"} spacing={1} className={style.notSpawned}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            id={c.uiid}
                            onClick={onDeleteItemButtonClick}
                            sx={{ color: "var(--light-color)" }}
                          >
                            <DeleteForeverIcon sx={{ color: "white", opacity: "0.1" }} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={c.icon} variant="rounded" className={style.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <span className={style.itemNameArea}>
                                <span className={style.itemName}>{c.name}</span>
                                <img src={getIcon(c.location_type)} width="30rem"></img>
                              </span>
                              <span className={style.timer}>
                                {ETClock.lt_getRemainingTimeBeforeSpawn(c.spawnTime_et)}
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
                                  {c.location_xcoord ? (
                                    <>
                                      {c.location_name} ▸ x:
                                      {c.location_xcoord}, y:{c.location_ycoord}
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
                  entries.push(row);
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
