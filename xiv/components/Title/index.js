import style from "./Title.module.css";

function Title(props) {
  return (
    <>
      <div className={style.pageTitle}>{props.text}</div>
    </>
  );
}

export default Title;
