import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_3() {
  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"10000Q AB0100 CR0000 EF001Q 0101MN 0QQ0OP"} />
        <FauxGrid disabledCells={"10000Q AB0100 CRMN00 EFOP1Q 010100 0QQ000"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"1QQ000 0AB100 0RD000 QEF010 01Q1MN 0000OP"} />
        <FauxGrid disabledCells={"1QQ000 0AB1MN 0RD0OP QEF010 01Q100 000000"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"1AB000 0CD100 0RFQ00 0QQ010 Q101MN 0000OP"} />
        <FauxGrid disabledCells={"1AB000 0CD1MN 0RFQOP 0QQ010 Q10100 000000"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"10000Q 0001MN GRI0OP JKL01Q 010100 0QQ000"} />
        <FauxGrid disabledCells={"1MN00Q 0OP100 GRI000 JKL01Q 010100 0QQ000"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"100000 GHI100 JRLQ00 0QQ010 Q101MN 0000OP"} />
        <FauxGrid disabledCells={"1000MN GHI1OP JRLQ00 0QQ010 Q10100 000000"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"100Q00 Q00100 0RHI00 0JKL10 Q101MN 000QOP"} />
        <FauxGrid disabledCells={"100QMN Q001OP 0RHI00 0JKL10 Q10100 000Q00"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"1MNQAB QOP1CD 0R00EF 000010 Q10100 000Q00"} />
        <FauxGrid disabledCells={"100QAB Q001CD MR00EF OP0010 Q10100 000Q00"} />
        <FauxGrid disabledCells={"1QQ0AB MN01CD OR00EF Q00010 01Q100 000000"} />
        <FauxGrid disabledCells={"1QQ0AB 0001CD 0RMNEF Q0OP10 01Q100 000000"} />
      </div>
    </>
  );
}
