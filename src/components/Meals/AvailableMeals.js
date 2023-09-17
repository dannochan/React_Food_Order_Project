import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMeal = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-playground-b0b9f-default-rtdb.firebaseio.com/meals.json/"
      );

      if (!response.ok) {
        throw new Error("Something went wrong during getting Data");
      }
      const data = await response.json();

      if (data) {
        const dataList = [];
        for (const item in data) {
          dataList.push({ id: item, ...data[item] });
        }
        setMeals(dataList);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem id={meal.id} key={meal.id} item={meal} />
  ));

  useEffect(() => {
    getMeal();
  }, [getMeal]);

  return (
    <section className={styles.meals}>
      <Card>
        {error && <p>Error occured ! {error}</p>}
        {isLoading && <p>Loading meals!</p>}
        {!isLoading && <ul>{mealList}</ul>}
      </Card>
    </section>
  );
}

export default AvailableMeals;
