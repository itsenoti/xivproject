import { Grid } from "@mui/material";
import FauxHallowCell_Chest_1 from "../../pages/FauxHallow/FauxHallowCell_Chest_1";
import style from "./FauxGrid.module.css";

const NORMAL_CELL = "0";
const DISABLED = "1";
const SWORD = "2";
const TREASURE_BOX = "3";
const FOX = "4";
const RECOMMENDED = "5";
const RECOMMENDED2 = "6";

function FauxGrid({ disabledCells }) {
  // 1: Disabled
  // 2: Sword
  // 3: Treasure Box
  // 4: Fox
  // 5: Recommended

  var allCells = [];
  var cleanBits = disabledCells;
  cleanBits = cleanBits.replace(/\s/g, ""); // Remove space
  var cellContent = NORMAL_CELL;

  for (let i = 0; i < 36; i++) {
    switch (cleanBits[i]) {
      case DISABLED:
        cellContent = style.fauxGridDisabledCell;
        break;
      case SWORD:
        cellContent = style.fauxGridSword;
        break;
      case TREASURE_BOX:
        cellContent = style.fauxGridTreasureBox;
        break;
      case FOX:
        cellContent = style.fauxGridFox;
        break;
      case RECOMMENDED:
      case RECOMMENDED2:
        cellContent = style.fauxGridRecommended;
        break;
      default:
        cellContent = disabledCells == "" ? style.fauxGridEmpty : style.fauxGridCellRegular;
        break;
    }

    if (cleanBits[i] == FOX) {
      // Return the fox's face
      allCells.push(<FauxHallowCell_Chest_1 />);
    } else {
      // return an empty cell
      allCells.push(
        <>
          <Grid item className={`${cellContent} ${style.fauxGridCell}`}>
            &#8203;
          </Grid>
        </>
      );
    }
  }
  return (
    <div className={style.fauxGridContainer}>
      {/* <div className={style.fauxGridRowContainer}>{allCells}</div> */}
      <Grid container rowSpacing={0} columnSpacing={0}>
        {allCells}
      </Grid>
    </div>
  );
}

export default FauxGrid;
