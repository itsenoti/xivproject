import * as style from "./Resources.module.css";

function Craft({ title }) {
  return (
    <>
      <div>
        <div className={style.midCraftContainer}>
          <div className={style.finalCraft}>Battle High III</div>
          <div>{title}</div>
        </div>
      </div>
    </>
  );
}

export default Craft;
