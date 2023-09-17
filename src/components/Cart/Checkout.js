import classes from "./Checkout.module.css";
import useFormInput from "../../hooks/form-validation";

const stringValidation = (value) => value.trim() !== "";
const postalValidation = (value) => value.match(/^[A-Z]{1}[0-9]{4}/g);
const cityValidation = (value) => value.match(/(bamberg|Bamberg)/g);

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useFormInput(stringValidation);
  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    reset: streetReset,
  } = useFormInput(stringValidation);
  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useFormInput(postalValidation);
  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: cityReset,
  } = useFormInput(cityValidation);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onAddOrder({
      enteredName,
      enteredStreet,
      enteredPostalCode,
      enteredCity,
    });

    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();
  };

  const nameInputClass = nameHasError
    ? `${classes.control} 
     ${classes.invalid}`
    : `${classes.control}`;

  const streetInputClass = streetHasError
    ? `${classes.control} 
     ${classes.invalid}`
    : `${classes.control}`;

  const postalCodeInputClass = postalCodeHasError
    ? `${classes.control} 
     ${classes.invalid}`
    : `${classes.control}`;

  const cityInputClass = cityHasError
    ? `${classes.control} 
     ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid Street</p>}
      </div>
      <div className={postalCodeInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>City must be Bamberg!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
