import { Grid } from "@mui/material";
import style from "./FauxHallow.module.css";

function FauxHallowCell_Disabled({ contentStyle = null, iconPart = null }) {
  return (
    <>
      <Grid item className={`${style.fauxGridCellRegular} ${style.fauxGridCell}`}></Grid>
    </>
  );
}
export default FauxHallowCell_Disabled;
