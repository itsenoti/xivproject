/**
 * @ Author: F.Villanueva
 * @ Create Time: 2024-05-19 17:05:12
 * @ Modified by: F.Villanueva
 * @ Modified time: 2024-05-19 17:47:39
 * @ Description:
 */

import FauxGrid from "../../components/FauxGrid";
import sets from "../../model/FauxHallows/sets.json";
import style from "./FauxHallow.module.css";

export default function Patterns({ set }) {
  if (!set) return "No pattern found";

  var setPatternsList = sets[set];

  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[1]} />
        <FauxGrid disabledCells={setPatternsList[2]} />
        <FauxGrid disabledCells={setPatternsList[3]} />
        <FauxGrid disabledCells={setPatternsList[4]} />
      </div>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[5]} />
        <FauxGrid disabledCells={setPatternsList[6]} />
        <FauxGrid disabledCells={setPatternsList[7]} />
        <FauxGrid disabledCells={setPatternsList[8]} />
      </div>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[9]} />
        <FauxGrid disabledCells={setPatternsList[10]} />
        <FauxGrid disabledCells={setPatternsList[11]} />
        <FauxGrid disabledCells={setPatternsList[12]} />
      </div>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[13]} />
        <FauxGrid disabledCells={setPatternsList[14]} />
        <FauxGrid disabledCells={setPatternsList[15]} />
        <FauxGrid disabledCells={setPatternsList[16]} />
      </div>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[17]} />
        <FauxGrid disabledCells={setPatternsList[18]} />
        <FauxGrid disabledCells={setPatternsList[19]} />
        <FauxGrid disabledCells={setPatternsList[20]} />
      </div>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={setPatternsList[21]} />
        <FauxGrid disabledCells={setPatternsList[22]} />
        <FauxGrid disabledCells={setPatternsList[23]} />
        <FauxGrid disabledCells={setPatternsList[24]} />
      </div>
    </>
  );
}
