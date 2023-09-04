import styles from "./Input.module.css";

function Input(props) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} onChange={props.onChange} />
    </div>
  );
}

export default Input;
