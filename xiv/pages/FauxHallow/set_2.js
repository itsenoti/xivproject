import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_2() {
  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"Q00QMN 0001OP 010010 00000Q 0GRI1Q 1JKL00"} />
        <FauxGrid disabledCells={"Q00Q00 000100 01MN10 00OP0Q 0GRI1Q 1JKL00"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0000MN 0001OP 010010 QGHIQ0 QJRL10 100Q00"} />
        <FauxGrid disabledCells={"0MN000 0OP100 010010 QGHIQ0 QJRL10 100Q00"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0000MN 0001OP 01Q010 GHIQ00 JKRQ10 10000Q"} />
        <FauxGrid disabledCells={"0MN000 0OP100 01Q010 GHIQ00 JKRQ10 10000Q"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"QMNQ00 0OP100 010010 00AB0Q 00RD1Q 10EF00"} />
        <FauxGrid disabledCells={"Q00Q00 000100 010010 MNAB0Q OPRD1Q 10EF00"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0000MN 0001OP 01Q010 0ABQ00 0CRQ10 1EF00Q"} />
        <FauxGrid disabledCells={"MN0000 OP0100 01Q010 0ABQ00 0CRQ10 1EF00Q"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0000MN 0001OP Q1AB1Q 00CD00 00RF10 1Q00Q0"} />
        <FauxGrid disabledCells={"MN0000 OP0100 Q1AB1Q 00CD00 00RF10 1Q00Q0"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"SHI000 JKL100 Q1001Q MN0000 OP0010 1Q00Q0"} />
        <FauxGrid disabledCells={"SHI000 JKL100 Q1001Q 000000 00MN10 1QOPQ0"} />
        <FauxGrid disabledCells={"SHI000 JKL100 010010 Q000Q0 QMN010 1OPQ00"} />
        <FauxGrid disabledCells={"SHI000 JKL100 01MN10 Q0OPQ0 Q00010 100Q00"} />
      </div>
    </>
  );
}
