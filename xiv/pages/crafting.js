import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckIcon from "@mui/icons-material/Check";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Announcements from "../components/announcements";
import Title from "../components/title";
import style from "./../pages/styles/Crafting.module.css";
import Header from "./Header";
import Navigation from "./Navigation";

import Rating from "@mui/material/Rating";
// Controller
import * as Jobs from "./api/crafting.json";

function Crafting({ theme, setTheme }) {
  const [searchInputString, setSearchInputString] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [currentDateTimeMs, setCurrentDateTimeMs] = useState(new Date().getTime());
  const [itemQty, setItemQty] = useState(1);

  const initialState = {};

  function search() {
    fetch(
      `https://garlandtools.org/api/search.php?text=${searchInputString}&type=item&craftable=true`
    )
      .then((response) => response.json())
      .then((result) => {
        // Clear the currently existing result list
        for (let index = 0; index < Object.keys(searchResult).length; index++) {
          searchResult[index] = null;
        }

        for (let index = 0; index < Object.keys(result).length; index++) {
          searchResult[index] = Object.values(result)[index];
        }
      });

    console.log(`${JSON.stringify(searchResult, null, 4)}`);
  }

  useEffect(() => {
    let updateTime = setInterval(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);

    return () => clearTimeout(updateTime);
  }, [currentDateTimeMs]);

  const onSearchButtonClick = (event) => {
    if (searchInputString != null) {
      search();
    }
  };

  const onSearchSetSearch = (event) => {
    event.preventDefault();
    setSearchInputString(event.target.value);
  };

  function checkIfAlreadyListed(id) {
    if (typeof window != "undefined") {
      let list = JSON.parse(window.localStorage.getItem("craftingList"));
      if (list?.[id]) return true;
      else return false;
    }
  }

  const addRemoveItemToTray = (event) => {
    if (typeof window != "undefined") {
      var existing_entries = {};
      var id = event.target.id;

      if (localStorage.getItem("craftingList")) {
        existing_entries = JSON.parse(window.localStorage.getItem("craftingList"));
      }

      if (existing_entries[event.target.id]) {
        console.log(`Delete ${id}`);
        delete existing_entries[id];
      } else {
        existing_entries[event.currentTarget.id] = { itemQty };
      }

      window.localStorage.setItem("craftingList", JSON.stringify(existing_entries));
    }
  };

  function getIconUrl(icon) {
    if (typeof icon == "undefined") icon = 0;
    else {
      if (typeof icon != "number") icon = parseInt(icon.split("/")[1]);
      var icon_dir =
        icon - (icon % 1000) < 100000 ? "0" + (icon - (icon % 1000)) : icon - (icon % 1000);
      icon = icon < 100000 ? "0" + icon : icon;
      icon = "https://xivapi.com/i/" + icon_dir + "/" + icon + ".png";
    }

    return icon;
  }

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ padding: 0, pt: 8 }} className={style.container}>
        <Title text={`Crafting ${itemQty}`} />

        <Box className={style.subNav}>
          <Button startIcon={<ArrowBackIosNewRoundedIcon />} sx={{ visibility: "hidden" }}>
            Previous Step
          </Button>
          <Button endIcon={<ArrowForwardIosRoundedIcon />}>Next Step</Button>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Paper
            component="form"
            sx={{ p: "2px 0px", display: "flex", alignItems: "center", width: "100%" }}
          >
            <InputBase
              sx={{ ml: 1, mr: 1, flex: 1 }}
              placeholder="Track item"
              inputProps={{ "aria-label": "track item" }}
              onChange={onSearchSetSearch}
              className={style.input}
              size="medium"
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={onSearchButtonClick}
            ></IconButton>
          </Paper>
          <IconButton aria-label="add" size="large" onClick={onSearchButtonClick}>
            <SearchOutlinedIcon sx={{ fontSize: 30 }} color="tertiary" />
          </IconButton>
        </Stack>

        {/* ************************************************************************ */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Icon</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Level</TableCell>
                <TableCell align="center">Crafter</TableCell>
                <TableCell align="center">Difficulty</TableCell>
                <TableCell align="center" style={{ width: "5rem" }}>
                  Quantity
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                var itemRow = [];
                if (searchResult) {
                  for (let index = 0; index < Object.keys(searchResult).length; index++) {
                    const item = Object.values(searchResult)[index];
                    const item_name = item?.["obj"]?.["n"];
                    const item_id = item?.["id"];
                    const item_lvl = item?.["obj"]?.["f"]?.[0]?.["lvl"];
                    const item_crafter = Jobs["Jobs"][item?.["obj"]?.["f"]?.[0]?.["job"]]?.["name"];
                    const item_difficulty = item?.["obj"]?.["f"]?.[0]?.["stars"];
                    var icon = item?.["obj"]?.["c"];

                    icon = getIconUrl(icon);

                    if (item_name != null) {
                      let _item_ = (
                        <TableRow
                          key={item_id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            <img
                              src={icon}
                              className={style.image}
                              onError={(event) => {
                                event.target.src = "/icons/placeholder.png";
                                event.onError = null;
                              }}
                              width="40px"
                              height="40px"
                            />
                          </TableCell>
                          <TableCell align="left">{item_name}</TableCell>
                          <TableCell align="center">{item_id}</TableCell>
                          <TableCell align="center">{item_lvl}</TableCell>
                          <TableCell align="center">
                            {item_crafter ? item_crafter : "Free Company Craft"}
                          </TableCell>
                          <TableCell align="center">
                            <Rating
                              name="read-only"
                              value={item_difficulty}
                              size="small"
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              type="number"
                              defaultValue="1"
                              size="small"
                              onChange={(event) => setItemQty(event.target.value)}
                            ></TextField>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              color={checkIfAlreadyListed(item_id) ? "success" : "primary"}
                              variant="contained"
                              id={item_id}
                              onClick={addRemoveItemToTray}
                            >
                              {checkIfAlreadyListed(item_id) ? (
                                <CheckIcon />
                              ) : (
                                <AddBoxRoundedIcon />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                      itemRow.push(_item_);
                    }
                  }
                }

                return itemRow;
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Crafting;
