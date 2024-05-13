import FauxGrid from "./fauxgrid";
import style from "./FauxHallow.module.css";

export default function Set_1() {
  return (
    <>
      <div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
      </div>

      <div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
        <div className={style.fauxGridContainer}>
          <FauxGrid />
        </div>
      </div>
    </>
  );
}
