import { Grid } from "@mui/material";
import Image from "next/image";
import style from "./FauxHallow.module.css";

const ICON_SIZE = 15;

function FauxHallowCell_Disabled({ contentStyle = null, iconPart = null }) {
  return (
    <>
      <Grid item className={`${style.fauxGridCell}`}>
        <Image
          src={"/icons/FauxHallows/FauxHallow_Disabled.png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Sword Icon"
        />
      </Grid>
    </>
  );
}
export default FauxHallowCell_Disabled;
