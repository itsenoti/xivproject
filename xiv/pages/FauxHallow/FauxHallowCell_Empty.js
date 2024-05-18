import { Grid } from "@mui/material";
import style from "./FauxHallow.module.css";

function FauxHallowCell_Empty({ contentStyle = null, iconPart = null }) {
  return (
    <>
      <Grid item className={`${style.fauxGridEmpty} ${style.fauxGridCell}`}></Grid>
    </>
  );
}
export default FauxHallowCell_Empty;
