import { Grid } from "@mui/material";
import Image from "next/image";
import * as GLOBAL from "../globals";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Recommended({ contentStyle = null, iconPart }) {
  switch (iconPart) {
    case GLOBAL.FauxHallow_Cell.RECOM_1:
      return Recommended_Print("1");
    case GLOBAL.FauxHallow_Cell.RECOM_2:
      return Recommended_Print("2");
    case GLOBAL.FauxHallow_Cell.RECOM_3:
      return Recommended_Print("3");
    case GLOBAL.FauxHallow_Cell.RECOM_4:
      return Recommended_Print("4");
    default:
      return Recommended_Print("1");
  }
}

const Recommended_Print = (src) => {
  var imgPath = `/icons/FauxHallows/FauxHallow_Recommended_${src}.png`;
  return (
    <>
      <Grid item className={`${style.fauxGridCell}`}>
        <Image src={imgPath} width={ICON_SIZE} height={ICON_SIZE} alt="Recommended Icon" />
      </Grid>
    </>
  );
};

export default FauxHallowCell_Recommended;
