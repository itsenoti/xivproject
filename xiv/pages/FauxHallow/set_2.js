import { Alert } from "@mui/material";
import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_2() {
  // 1: Disabled
  // 2: Sword
  // 3: Treasure Box
  // 4: Fox
  // 5: Recommended
  // const coloredCells = "000000 001010 010000 000050 001000 000001";

  return (
    <>
      <Alert severity="warning">This pattern has 2 possible sword positions</Alert>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"400433 000133 010010 000004 025214 122200"} />
        <FauxGrid disabledCells={"400400 000100 013310 003304 025214 122200"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"000033 000133 010010 422240 425210 100400"} />
        <FauxGrid disabledCells={"033000 033100 010010 422240 425210 100400"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"000033 000133 014010 222400 225410 100004"} />
        <FauxGrid disabledCells={"033000 033100 014010 222400 225410 100004"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"433400 033100 010010 002204 005214 102200"} />
        <FauxGrid disabledCells={"400400 000100 010010 332204 335214 102200"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"000033 000133 014010 022400 025410 122004"} />
        <FauxGrid disabledCells={"330000 330100 014010 022400 025410 122004"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"000033 000133 412214 002200 005210 140040"} />
        <FauxGrid disabledCells={"330000 330100 412214 002200 005210 140040"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"522000 222100 410014 330000 330010 140040"} />
        <FauxGrid disabledCells={"522000 222100 410014 000000 003310 143340"} />
        <FauxGrid disabledCells={"522000 222100 010010 400040 433010 133400"} />
        <FauxGrid disabledCells={"522000 222100 013310 403340 400010 100400"} />
      </div>
    </>
  );
}
