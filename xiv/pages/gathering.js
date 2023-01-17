import { Container, Divider, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, { useEffect, useState } from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";
import Avatar from "@mui/material/Avatar";
// import Zoom from "@mui/material/Grow";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Announcements from "../components/announcements";
import Title from "../components/title";
import * as ETClock from "./../utils/EorzeaClock";
import * as Data from "./api/data.json";
import Header from "./Header";
import Navigation from "./Navigation";
import style from "./styles/Gathering.module.css";

import GIcons from "./../pages/api/gathering.json";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";

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

  if (rows) {
    loadItems();
  }

  async function loadItems(uiid = "") {
    for (let index = 0; index < Object.keys(rows).length; index++) {
      let tgtItem = (await garlandtools.search(Object.keys(rows)[index]))[0];

      let dum = await garlandtools.search(Object.keys(rows)[index]);
      // console.log(`XXXXX ${JSON.stringify(dum, null, 4)}`);

      if (tgtItem) {
        var itemName = tgtItem.obj.n;
        items[tgtItem.obj.n] = {
          id: tgtItem.id,
          name: tgtItem.obj.n,
          type: tgtItem.type,
          icon: tgtItem.obj.c,
        };

        // console.log(`Name     ${tgtItem.obj.n} ${JSON.stringify(tgtItem, null, 4)}`);

        tgtItem = await garlandtools.item(tgtItem.id);

        items[itemName]["description"] = tgtItem.item.description;

        var nodes = tgtItem.item.nodes || 0;

        var nodeInfoList = {};

        for (let index = 0; index < nodes.length; index++) {
          let nodeDetails = [""];
          nodeDetails = (await garlandtools.node(nodes[index])).node;

          // console.log(
          //   `Nodes (${(itemName, nodeDetails.type)})   ${JSON.stringify(nodeDetails, null, 4)}`
          // );

          // console.log(nodeDetails);
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

        // console.log(`nodeInfoList   ${JSON.stringify(nodeInfoList, null, 4)}`);

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

  const onDeleteItemButtonClick = (event) => {
    event.preventDefault();

    console.log(`Attempting deletion of ${event.currentTarget.id}`);

    delete rows[event.currentTarget.id];
    delete items[event.currentTarget.id];

    if (typeof window != "undefined") {
      window.localStorage.setItem("gatheringList", JSON.stringify(rows));
    }
    console.log(`${event.currentTarget.id} deleted.`);

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

  function cleanString(txt) {
    let dummyText = txt.split(" ");
    for (let index = 0; index < dummyText.length; index++) {
      dummyText[index] = dummyText[index].charAt(0).toUpperCase() + dummyText[index].substring(1);
    }

    return dummyText.join(" ");
  }

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

    rows[cleanString(searchString)] = id;

    if (typeof window != "undefined") {
      window.localStorage.setItem("gatheringList", JSON.stringify(rows));
    }

    loadItems();
  }

  function getIcon(type) {
    console.log(type);
    return GIcons["Icons"][type];
  }

  if (!hasLoaded)
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
        Loading...
      </Container>
    </>;

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
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked onChange={changeDisplayList} />}
              label="Only show spawned"
              sx={{ mt: 2 }}
            />
          </FormGroup>
          <List sx={{ width: "100%" }}>
            {(() => {
              var spawnedItems = [];
              var dispRow = [];
              var numberOfLocations = 0;

              for (let index = 0; index < Object.keys(items).length; index++) {
                var data = Object.keys(items)[index];

                if (items[data].location?.[0]) {
                  numberOfLocations = Object.keys(items[data].location).length;
                }

                for (let loc = 0; loc < numberOfLocations; loc++) {
                  var spawned = ETClock.lt_getRemainingTimeBeforeSpawn(
                    items[data].location?.[loc]?.spawn1,
                    items[data].location?.[loc]?.spawn2
                  );

                  var trigger = false;
                  trigger =
                    spawned.charAt(spawned.length - 1) == "★"
                      ? {
                          function() {
                            setShowHasSpawed(true);
                          },
                        }
                      : false;
                  if (spawned == "00:00 ★") {
                    trigger = false;
                  }

                  let row = (
                    <Stack width={"100%"} spacing={1} className={trigger ? style.spawned : ""}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            id={items[data]["uiid"]}
                            onClick={onDeleteItemButtonClick}
                            sx={{ color: "var(--light-color)" }}
                          >
                            <DeleteForeverIcon sx={{ color: "white", opacity: "0.1" }} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={items[data].icon}
                            variant="rounded"
                            className={style.avatar}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <span className={style.itemNameArea}>
                                <span className={style.itemName}>{data}</span>
                                <img
                                  src={getIcon(items[data].location?.[loc].type)}
                                  width="30rem"
                                ></img>{" "}
                              </span>
                              <span className={style.timer}>
                                {ETClock.lt_getRemainingTimeBeforeSpawn(
                                  items[data].location?.[loc]?.spawn1,
                                  items[data].location?.[loc]?.spawn2
                                )}
                              </span>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                <span className={style.location}>
                                  {/* {console.log(`${getIcon(items[data].location?.[loc].type)}`)} */}
                                  {items[data].location?.[loc]?.xcoord ? (
                                    <React.Fragment>
                                      {items[data].location?.[loc]?.name} ▸ x:
                                      {items[data].location?.[loc]?.xcoord}
                                      ,y:{items[data].location?.[loc]?.ycoord}
                                    </React.Fragment>
                                  ) : (
                                    "Cannot be gathered by normal means."
                                  )}
                                </span>
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </Stack>
                  );

                  let AnimateSpawned = (
                    <Slide direction="right" in={trigger} mountOnEnter unmountOnExit>
                      {row}
                    </Slide>
                  );

                  let AnimateDeSpawned = (
                    // <Zoom in={!trigger} style={{ transitionDelay: trigger ? "500ms" : "0ms" }}>
                    //   {row}
                    // </Zoom>
                    <Slide direction="left" in={!trigger} mountOnEnter unmountOnExit>
                      {row}
                    </Slide>
                  );

                  if (showHasSpawned) spawnedItems.push(AnimateSpawned);
                  else dispRow.push(row);

                  spawned = null;
                }
              }

              return [...spawnedItems, ...dispRow];
            })()}
          </List>
        </Stack>
      </Container>
    </>
  );
}

export default Gathering;
