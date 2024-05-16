import style from "./FauxGrid.module.css";

const DISABLED = "1";
const SWORD = "2";
const TREASURE_BOX = "3";
const FOX = "4";
const RECOMMENDED = "5";

function FauxGrid({ disabledCells }) {
  // 1: Disabled    2: Sword     3: Treasure Box      4: Fox    5: Recommended

  var allCells = [];
  var cellContent = "0";

  for (let i = 0; i < 36; i++) {
    switch (disabledCells[i]) {
      case DISABLED:
        cellContent = style.fauxGridDisabledCell;
        break;
      case SWORD:
        cellContent = style.fauxGridSword;
        break;
      case TREASURE_BOX:
        cellContent = style.fauxGridTreasureBox;
        break;
      case FOX:
        cellContent = style.fauxGridFox;
        break;
      case RECOMMENDED:
        cellContent = style.fauxGridRecommended;
        break;
      default:
        cellContent = style.fauxGridCell;
        break;
    }

    allCells.push(<div className={cellContent}></div>);
  }
  return <div className={style.fauxGridRowContainer}>{allCells}</div>;
}

export default FauxGrid;
