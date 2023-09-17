import { useState } from "react";

function useFormInput(checkValidation) {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = checkValidation(enteredValue);
  const hasError = valueIsTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setValueIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setValueIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    changeHandler: valueChangeHandler,
    blurHandler: valueBlurHandler,
    reset,
  };
}

export default useFormInput;
