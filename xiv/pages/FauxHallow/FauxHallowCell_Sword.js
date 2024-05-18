import { Grid } from "@mui/material";
import Image from "next/image";
import * as GLOBAL from "../globals";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Sword({ contentStyle = null, iconPart }) {
  switch (iconPart) {
    case GLOBAL.FauxHallow_Cell.SWORD_V_1:
      return Sword_Print("V_1");
    case GLOBAL.FauxHallow_Cell.SWORD_V_2:
      return Sword_Print("V_2");
    case GLOBAL.FauxHallow_Cell.SWORD_V_3:
      return Sword_Print("V_3");
    case GLOBAL.FauxHallow_Cell.SWORD_V_4:
      return Sword_Print("V_4");
    case GLOBAL.FauxHallow_Cell.SWORD_V_5:
      return Sword_Print("V_5");
    case GLOBAL.FauxHallow_Cell.SWORD_V_6:
      return Sword_Print("V_6");
    case GLOBAL.FauxHallow_Cell.SWORD_H_1:
      return Sword_Print("H_1");
    case GLOBAL.FauxHallow_Cell.SWORD_H_2:
      return Sword_Print("H_2");
    case GLOBAL.FauxHallow_Cell.SWORD_H_3:
      return Sword_Print("H_3");
    case GLOBAL.FauxHallow_Cell.SWORD_H_4:
      return Sword_Print("H_4");
    case GLOBAL.FauxHallow_Cell.SWORD_H_5:
      return Sword_Print("H_5");
    case GLOBAL.FauxHallow_Cell.SWORD_H_6:
      return Sword_Print("H_6");
    default:
      return Sword_Print("H_1");
  }
}

const Sword_Print = (src) => {
  return (
    <>
      <Grid item className={`${style.fauxGridCell}`}>
        <Image
          src={"/icons/FauxHallows/FauxHallow_Sword_" + src + ".png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Sword Icon"
        />
      </Grid>
    </>
  );
};

export default FauxHallowCell_Sword;
