import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem(props) {
  const meal = props.item;
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>

      <div>
        <MealItemForm id={meal.id} />
      </div>
    </li>
  );
}

export default MealItem;
