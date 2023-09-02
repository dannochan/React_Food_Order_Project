import { Fragment } from "react";
import MealSummary from "./MealSummary";
import AvailableMeals from "./AvailableMeals";

function Meals(props) {
  return (
    <Fragment>
      <MealSummary />
      <AvailableMeals />
    </Fragment>
  );
}

export default Meals;
