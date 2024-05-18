import { Grid } from "@mui/material";
import * as GLOBAL from "../globals";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Chest({ contentStyle = null, iconPart }) {
  switch (iconPart) {
    case GLOBAL.FauxHallow_Cell.TREAS_V_1:
      return TreasureChest_Print("1");
    case GLOBAL.FauxHallow_Cell.TREAS_V_2:
      return TreasureChest_Print("2");
    case GLOBAL.FauxHallow_Cell.TREAS_V_3:
      return TreasureChest_Print("3");
    case GLOBAL.FauxHallow_Cell.TREAS_V_4:
      return TreasureChest_Print("4");
    default:
      return TreasureChest_Print("V_1");
  }
}

const TreasureChest_Print = (src) => {
  var imgPath = `/icons/FauxHallows/FauxHallow_Chest_V_${src}.png`;
  return (
    <>
      <Grid
        item
        className={`${style.fauxGridCell}`}
        sx={{ background: `url(${imgPath})`, backgroundSize: `contain` }}
      >
        {/* <Image src={imgPath} width={ICON_SIZE} height={ICON_SIZE} alt="Chest Icon" /> */}
      </Grid>
    </>
  );
};

export default FauxHallowCell_Chest;
