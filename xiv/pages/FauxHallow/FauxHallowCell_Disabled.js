import { Grid } from "@mui/material";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Disabled({ contentStyle = null, iconPart = null }) {
  var imgPath = `/icons/FauxHallows/FauxHallow_Disabled.png`;
  return (
    <>
      <Grid
        item
        className={`${style.fauxGridCell}`}
        sx={{ background: `url(${imgPath})`, backgroundSize: `contain` }}
      ></Grid>
    </>
  );
}
export default FauxHallowCell_Disabled;
