/**
 * @ Author: F.Villanueva
 * @ Create Time: 2024-05-16 11:35:25
 * @ Modified by: F.Villanueva
 * @ Modified time: 2024-05-19 02:09:50
 * @ Description:
 */

import { Grid } from "@mui/material";
import FauxHallowCell_Chest from "../../pages/FauxHallow/FauxHallowCell_Chest";
import FauxHallowCell_Disabled from "../../pages/FauxHallow/FauxHallowCell_Disabled";
import FauxHallowCell_Empty from "../../pages/FauxHallow/FauxHallowCell_Empty";
import FauxHallowCell_Fox from "../../pages/FauxHallow/FauxHallowCell_Fox";
import FauxHallowCell_Recommended from "../../pages/FauxHallow/FauxHallowCell_Recommended";
import FauxHallowCell_Regular from "../../pages/FauxHallow/FauxHallowCell_Regular";
import FauxHallowCell_Sword from "../../pages/FauxHallow/FauxHallowCell_Sword";
import * as GLOBAL from "../../pages/globals";
import { RemoveSpacesFromString } from "../../utils/StringConverters";
import style from "./FauxGrid.module.css";

function FauxGrid({ disabledCells }) {
  var allCells = [];
  var cleanBits = RemoveSpacesFromString(disabledCells);

  var cellContent = style.fauxGridCellRegular;

  var cellEmpty = style.fauxGridCellEmpty;

  if (disabledCells == "") {
    allCells.push(<FauxHallowCell_Empty iconPart={GLOBAL.FauxHallow_Cell.DISABLED} />);
  } else {
    for (let i = 0; i < 36; i++) {
      switch (cleanBits[i]) {
        case GLOBAL.FauxHallow_Cell.DISABLED:
          allCells.push(<FauxHallowCell_Disabled iconPart={GLOBAL.FauxHallow_Cell.DISABLED} />);
          break;
        case GLOBAL.FauxHallow_Cell.TREAS_V_1:
          allCells.push(<FauxHallowCell_Chest iconPart={GLOBAL.FauxHallow_Cell.TREAS_V_1} />);
          break;
        case GLOBAL.FauxHallow_Cell.TREAS_V_2:
          allCells.push(<FauxHallowCell_Chest iconPart={GLOBAL.FauxHallow_Cell.TREAS_V_2} />);
          break;
        case GLOBAL.FauxHallow_Cell.TREAS_V_3:
          allCells.push(<FauxHallowCell_Chest iconPart={GLOBAL.FauxHallow_Cell.TREAS_V_3} />);
          break;
        case GLOBAL.FauxHallow_Cell.TREAS_V_4:
          allCells.push(<FauxHallowCell_Chest iconPart={GLOBAL.FauxHallow_Cell.TREAS_V_4} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_1:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_1} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_2:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_2} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_3:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_3} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_4:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_4} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_5:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_5} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_V_6:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_V_6} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_1:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_1} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_2:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_2} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_3:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_3} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_4:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_4} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_5:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_5} />);
          break;
        case GLOBAL.FauxHallow_Cell.SWORD_H_6:
          allCells.push(<FauxHallowCell_Sword iconPart={GLOBAL.FauxHallow_Cell.SWORD_H_6} />);
          break;
        case GLOBAL.FauxHallow_Cell.FOX:
          allCells.push(<FauxHallowCell_Fox iconPart={GLOBAL.FauxHallow_Cell.FOX} />);
          break;
        case GLOBAL.FauxHallow_Cell.RECOM_1:
          allCells.push(<FauxHallowCell_Recommended iconPart={GLOBAL.FauxHallow_Cell.RECOM_1} />);
          break;
        case GLOBAL.FauxHallow_Cell.RECOM_2:
          allCells.push(<FauxHallowCell_Recommended iconPart={GLOBAL.FauxHallow_Cell.RECOM_2} />);
          break;
        case GLOBAL.FauxHallow_Cell.RECOM_3:
          allCells.push(<FauxHallowCell_Recommended iconPart={GLOBAL.FauxHallow_Cell.RECOM_3} />);
          break;
        case GLOBAL.FauxHallow_Cell.RECOM_4:
          allCells.push(<FauxHallowCell_Recommended iconPart={GLOBAL.FauxHallow_Cell.RECOM_4} />);
          break;
        case GLOBAL.FauxHallow_Cell.REGULAR:
        default:
          cellContent = style.fauxGridCellRegular;
          allCells.push(<FauxHallowCell_Regular iconPart={GLOBAL.FauxHallow_Cell.REGULAR} />);
          break;
      }
    }
  }

  return (
    <div className={style.fauxGridContainer}>
      <Grid container rowSpacing={0} columnSpacing={0}>
        {allCells}
      </Grid>
    </div>
  );
}

export default FauxGrid;
