import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import { useRef, useState } from "react";

function MealItemForm(props) {
  /* meanless way to pass amount 
  const [amountState, setAmountState] = useState("");
  const cartCtx = useContext(CartContext);

  const amountChangeHandler = (event) => {
    let selectedAmount = +event.target.value.trim();
    if (
      selectedAmount < 0 ||
      selectedAmount > 5 ||
      !Boolean(amountChangeHandler)
    ) {
      return;
    }
    setAmountState(event.target.value);
  }; */

  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedAmount = +amountInputRef.current.value.trim();

    if (selectedAmount < 1 || selectedAmount > 5 || !Boolean(selectedAmount)) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(selectedAmount);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid number!</p>}
    </form>
  );
}

export default MealItemForm;
