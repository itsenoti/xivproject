import { Grid } from "@mui/material";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Fox({ contentStyle = null, iconPart = null }) {
  var imgPath = "/icons/FauxHallows/FauxHallowFox.png";
  return (
    <>
      <Grid
        item
        className={`${style.fauxGridCell}`}
        sx={{ background: `url(${imgPath})`, backgroundSize: `contain` }}
      >
        {/* <Image src={imgPath} width={ICON_SIZE} height={ICON_SIZE} alt="Fox Icon" /> */}
      </Grid>
    </>
  );
}

export default FauxHallowCell_Fox;
