import { Grid } from "@mui/material";
import Image from "next/image";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Fox({ contentStyle = null, iconPart = null }) {
  return (
    <>
      <Grid item className={`${style.fauxGridCell}`}>
        <Image
          src={"/icons/FauxHallows/FauxHallowFox.png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Fox Icon"
        />
      </Grid>
    </>
  );
}

export default FauxHallowCell_Fox;
