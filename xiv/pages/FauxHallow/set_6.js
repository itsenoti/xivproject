import FauxGrid from "../../components/FauxGrid";
import style from "./FauxHallow.module.css";

export default function Set_6() {
  return (
    <>
      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"00Q0AB 0001CD 1Q00EF Q01Q01 0001MN 0000OP"} />
        <FauxGrid disabledCells={"00Q0AB 0001CD 1Q00EF Q01Q01 MN0100 OP0000"} />
        <FauxGrid disabledCells={"MN00AB OP01CD 10QQEF 001001 00Q1Q0 000000"} />
        <FauxGrid disabledCells={"0000AB 0001CD 10QQEF MN1001 OPQ1Q0 000000"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"MNQ000 OP0100 1Q0000 Q01Q01 GHI100 JKL000"} />
        <FauxGrid disabledCells={"00Q000 0001MN 1Q00OP Q01Q01 GHI100 JKL000"} />
        <FauxGrid disabledCells={"0000Q0 0MN10Q 1OP0Q0 001011 GHI100 JKLQ00"} />
        <FauxGrid disabledCells={"0000Q0 00010Q 1000Q0 001001 GHI1MN JKLQOP"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0000Q0 00010Q 1000Q0 AB1001 CD01MN EF0QOP"} />
        <FauxGrid disabledCells={"MN00Q0 OP010Q 1000Q0 AB1001 CD0100 EF0Q00"} />
        <FauxGrid disabledCells={""} />
        <FauxGrid disabledCells={""} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"GHI0MN JKL1OP 10QQ00 001001 00Q1Q0 000000"} />
        <FauxGrid disabledCells={"GHI000 JKL100 10QQ00 001001 MNQ1Q0 OP0000"} />
        <FauxGrid disabledCells={"GHIQ00 JKL100 100MNQ 001OP1 000100 Q0000Q"} />
        <FauxGrid disabledCells={"GHIQ00 JKL100 10000Q 001001 0MN100 QOP00Q"} />
      </div>

      <div className={style.fauxGridContainerRow}>
        <FauxGrid disabledCells={"0ABQMN 0CD1OP 1EF00Q 001001 000100 Q0000Q"} />
        <FauxGrid disabledCells={"0ABQ00 0CD100 1EF00Q MN1001 OP0100 Q0000Q"} />
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
