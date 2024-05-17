import { Grid } from "@mui/material";
import Image from "next/image";
import style from "./FauxHallow.module.css";

export default function FauxHallowCell_Chest_1() {
  return (
    <>
      <Grid item className={`${cellContent} ${style.fauxGridCell}`}>
        <Image
          src={"/icons/FauxHallows/FauxHallow_Chest_V_1.png"}
          width={15}
          height={15}
          alt="Chest Icon 01"
        />
      </Grid>
    </>
  );
}
