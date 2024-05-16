import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_1() {
  const disabledCells = "000000001010010000000000001000000001";

  return (
    <>
      <div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
      </div>

      <div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid disabledCells={disabledCells} />
        </div>
      </div>
    </>
  );
}
