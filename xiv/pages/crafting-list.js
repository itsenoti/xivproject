import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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

// Controller

function CraftingList({ theme, setTheme }) {
  const [searchInputString, setSearchInputString] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [currentDateTimeMs, setCurrentDateTimeMs] = useState(new Date().getTime());
  const [itemQty, setItemQty] = useState(1);
  const [midIngredientsList, setMidIngredientsList] = useState({});
  const [topIngredientsList, setTopIngredientsList] = useState({});
  const [buyableMaterials, setBuyableMaterials] = useState({});
  const [endProductsList, setEndProductsList] = useState({});

  const garlandtools = require("garlandtools-api");

  async function search() {
    if (typeof window != "undefined") {
      var oCurrentCraftingList = JSON.parse(window.localStorage.getItem("craftingList")) || [];
      if (oCurrentCraftingList) {
        for (let index = 0; index < Object.keys(oCurrentCraftingList).length; index++) {
          var iItemId = Object.keys(oCurrentCraftingList)[index];
          var oItemBreakDown = await garlandtools.item(iItemId);
          console.log(oItemBreakDown);

          getIngredients(oItemBreakDown);
        }
      }

      // console.log(`Top Ingredients - ${JSON.stringify(topIngredientsList, null, 3)}`);
      // console.log(`Mid Ingredients - ${JSON.stringify(midIngredientsList, null, 3)}`);
    }
  }

  function getIngredients(oItemBreakDown) {
    var oIngredientsList = oItemBreakDown.ingredients;
  }

  useEffect(() => {
    let updateTime = setTimeout(function () {
      setCurrentDateTimeMs(new Date().getTime());
    }, 1000);

    return () => clearTimeout(updateTime);
  }, []);

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
        <Title text={`Crafting List ${itemQty}`} />

        <Box className={style.subNav}>
          <Button startIcon={<ArrowBackIosNewRoundedIcon />}>Add More Items</Button>
          <Button endIcon={<ArrowForwardIosRoundedIcon />}>Craft Items</Button>
        </Box>

        {/* ************************************************************************ */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Icon</TableCell>
                {/* <TableCell align="center">ID</TableCell> */}
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Needed</TableCell>
                <TableCell align="center">Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                search();

                var row = [];

                var topIngredientsKeys = Object.keys(topIngredientsList);
                topIngredientsKeys.forEach((i) => {
                  let _item_ = (
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        <img
                          src={getIconUrl(topIngredientsList[i].icon)}
                          onError={(event) => {
                            event.target.src = "/icons/placeholder.png";
                            event.onError = null;
                          }}
                          width="40px"
                          height="40px"
                        />
                      </TableCell>
                      {/* <TableCell align="center">{topIngredientsList[i].id}</TableCell> */}
                      <TableCell align="center">{topIngredientsList[i].name}</TableCell>
                      <TableCell align="center">{topIngredientsList[i].amount}</TableCell>
                      <TableCell align="center">{topIngredientsList[i].amount}</TableCell>
                    </TableRow>
                  );

                  row.push(_item_);
                });
                return row;
              })()}
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Icon</TableCell>
                {/* <TableCell align="center">ID</TableCell> */}
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Needed</TableCell>
                <TableCell align="center">Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                search();

                var row = [];

                var midIngredientsListKeys = Object.keys(midIngredientsList);
                midIngredientsListKeys.forEach((i) => {
                  let _item_ = (
                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        <img
                          src={getIconUrl(midIngredientsList[i].icon)}
                          onError={(event) => {
                            event.target.src = "/icons/placeholder.png";
                            event.onError = null;
                          }}
                          width="40px"
                          height="40px"
                        />
                      </TableCell>
                      {/* <TableCell align="center">{topIngredientsList[i].id}</TableCell> */}
                      <TableCell align="center">{midIngredientsList[i].name}</TableCell>
                      <TableCell align="center">{midIngredientsList[i].amount}</TableCell>
                      <TableCell align="center">{midIngredientsList[i].amount}</TableCell>
                    </TableRow>
                  );

                  row.push(_item_);
                });
                return row;
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CraftingList;
