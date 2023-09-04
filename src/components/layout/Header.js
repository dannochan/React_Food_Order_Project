import { Fragment } from "react";

import styles from "./Header.module.css";
import mealsImage from "../../asset/meals.png";
import HeaderButton from "./HeaderButton";

function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>DeliciosFood</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="MealImage" />
      </div>
    </Fragment>
  );
}

export default Header;
