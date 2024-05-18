import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_5() {
  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"GHI1MN JKL0OP 010Q10 Q00100 00Q000 001Q00"} />
        <FauxGrid disabledCells={"GHI100 JKL000 010Q10 Q00100 00Q0MN 001QOP"} />
        <FauxGrid disabledCells={"GHI100 JKL0Q0 01Q010 00Q1Q0 MN0000 OP1000"} />
        <FauxGrid disabledCells={"GHI100 JKL0Q0 01Q010 00Q1Q0 000MN0 001OP0"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"000100 000000 010Q10 Q001AB MNQ0CD OP1QEF"} />
        <FauxGrid disabledCells={"0MN100 0OP000 010Q10 Q001AB 00Q0CD 001QEF"} />
        <FauxGrid disabledCells={"0Q0100 Q0Q000 01001Q 0MN1AB 0OP0CD 0010EF"} />
        <FauxGrid disabledCells={"0Q01MN Q0Q0OP 01001Q 0001AB 0000CD 0010EF"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0Q01MN Q0Q0OP 01001Q 000100 000GHI 001JKL"} />
        <FauxGrid disabledCells={"0Q0100 Q0Q000 01001Q 000100 MN0GHI OP1JKL"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"MN0100 OP00Q0 01Q010 ABQ1Q0 CD0000 EF1000"} />
        <FauxGrid disabledCells={"000100 0000Q0 01Q010 ABQ110 CD00MN EF10OP"} />
        <FauxGrid disabledCells={"00Q10Q 00MN00 Q1OP10 AB0100 CD0000 EF100Q"} />
        <FauxGrid disabledCells={"00Q10Q 000000 Q10010 AB01MN CD00OP EF100Q"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"MNQ10Q OP0000 Q10010 GHI100 JKL000 00100Q"} />
        <FauxGrid disabledCells={"00Q10Q 000000 Q10010 GHI100 JKLMN0 001OPQ"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>
    </>
  );
}
