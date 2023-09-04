import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

function MealItemForm(props) {
  const submitHandler = () => {};

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        onChange={addItemHandler}
      />
      <button type="submit">+ Add</button>
    </form>
  );
}

export default MealItemForm;
