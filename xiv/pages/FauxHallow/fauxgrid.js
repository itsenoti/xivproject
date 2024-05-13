import style from "./FauxHallow.module.css";

function FauxGrid(props) {
  var disabledCells = props.disabledCells;

  const cells = (disabledCells) => {
    var allCells = [];
    for (let i = 0; i < 36; i++) {
      allCells.push(
        <div
          className={disabledCells[i] == "1" ? style.fauxGridDisabledCell : style.fauxGridCell}
        ></div>
      );
    }
    return <div className={style.fauxGridRowContainer}>{allCells}</div>;
  };

  return cells(props.disabledCells);
  // return (
  //   <div className={style.fauxGridRowContainer}>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //     <div className={style.fauxGridCell}></div>
  //   </div>
  // );
}

export default FauxGrid;
