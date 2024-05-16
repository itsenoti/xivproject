import style from "./FauxGrid.module.css";

function FauxGrid(props) {
  var allCells = [];
  for (let i = 0; i < 36; i++) {
    allCells.push(
      <div
        className={props.disabledCells[i] == "1" ? style.fauxGridDisabledCell : style.fauxGridCell}
      ></div>
    );
  }
  return <div className={style.fauxGridRowContainer}>{allCells}</div>;
}

export default FauxGrid;
