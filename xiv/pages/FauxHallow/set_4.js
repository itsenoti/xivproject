import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_4() {
  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"00GHI1 Q1JKL0 Q00000 010010 MN1000 OPQ00Q"} />
        <FauxGrid disabledCells={"00GHI1 Q1JKL0 Q0MN00 01OP10 001000 00Q00Q"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"00Q001 01GHIQ 0QJKLQ 010010 MN1000 OP0000"} />
        <FauxGrid disabledCells={"00Q001 01GHIQ 0QJKLQ 010010 001MN0 000OP0"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"Q00001 01QGHI 00QJKL 010Q10 MN1000 OP0000"} />
        <FauxGrid disabledCells={"Q00001 01QGHI 00QJKL 010Q10 001MN0 000OP0"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"00AB01 Q1CD00 Q0EF00 010010 001MN0 00QOPQ"} />
        <FauxGrid disabledCells={"00AB01 Q1CDMN Q0EFOP 010010 001000 00Q00Q"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"Q00AB1 01QCD0 00QEF0 010Q10 MN1000 OP0000"} />
        <FauxGrid disabledCells={"Q00AB1 01QCD0 00QEF0 010Q10 0010MN 0000OP"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0Q00Q1 01AB00 00CD00 Q1EF1Q MN1000 OP0000"} />
        <FauxGrid disabledCells={"0Q00Q1 01AB00 00CD00 Q1EF1Q 0010MN 0000OP"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0Q00Q1 0100MN 0000OP Q1001Q 001GHI 000JKL"} />
        <FauxGrid disabledCells={"0QMNQ1 01OP00 000000 Q1001Q 001GHI 000JKL"} />
        <FauxGrid disabledCells={"00QMN1 010OPQ 0Q000Q 010010 001GHI 000JKL"} />
        <FauxGrid disabledCells={"00Q001 01000Q 0QMN0Q 01OP10 001GHI 000JKL"} />
      </div>
    </>
  );
}
