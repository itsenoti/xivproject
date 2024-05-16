import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_1() {
  // 1: Disabled
  // 2: Sword
  // 3: Treasure Box
  // 4: Fox
  // 5: Recommended
  // const coloredCells = "000000 001010 010000 000050 001000 000001";

  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"330440 331010 410022 000052 001022 400001"} />
        <FauxGrid disabledCells={"000440 001010 413322 003352 001022 400001"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"330000 331410 010224 000250 001220 000441"} />
        <FauxGrid disabledCells={"000000 001410 010224 330250 331220 000441"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"330004 331010 010440 004250 001220 000221"} />
        <FauxGrid disabledCells={"000004 001010 010440 334250 331220 000221"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"330004 331010 010440 004252 001222 000001"} />
        <FauxGrid disabledCells={"000004 001010 010440 004252 331222 330001"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"334000 331014 012220 002250 001004 004001"} />
        <FauxGrid disabledCells={"004000 001014 012220 002250 331004 334001"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"004000 001014 010000 220050 221334 224331"} />
        <FauxGrid disabledCells={"004000 001014 010033 220053 221004 224001"} />
        <FauxGrid disabledCells={"000000 001410 010004 220053 221033 220441"} />
        <FauxGrid disabledCells={"000000 001410 013304 223350 221000 220441"} />
      </div>
    </>
  );
}
