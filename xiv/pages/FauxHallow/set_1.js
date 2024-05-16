import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_1() {
  // 1: Disabled    2: Sword     3: Treasure Box      4: Fox
  const coloredCells = "000000 001010 010000 000050 001000 000001";

  return (
    <>
      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"330440331010410022000052001022400001"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000440001010413322003352001022400001"} />
        </div>
      </div>

      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"330000331410010224000250001220000441"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000000001410010224330250331220000441"} />
        </div>
      </div>

      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"330004331010010440004250001220000221"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000004001010010440334250331220000221"} />
        </div>
      </div>

      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"330004331010010440004252001222000001"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000004001010010440004252331222330001"} />
        </div>
      </div>

      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"334000331014012220002250001004004001"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"004000001014012220002250331004334001"} />
        </div>
      </div>

      <div className={style.row}>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"004000001014010000220050221334224331"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"004000001014010033220053221004224001"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000000001410010004220053221033220441"} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={"000000001410013304223350221000220441"} />
        </div>
      </div>
    </>
  );
}
