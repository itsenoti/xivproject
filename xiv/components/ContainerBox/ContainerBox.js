import styles from "./Container.module.css";

function ContainerBox(props) {
  return (
    <div>
      <div>
        <span className={styles.title}>{props.title}</span>
      </div>
      <div>{props.body}</div>
    </div>
  );
}

export default ContainerBox;
