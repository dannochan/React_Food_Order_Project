import styles from "./HeaderButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

function HeaderButton(props) {
  const cartCtx = useContext(CartContext);
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  const btnClass = `${styles.button}  ${isBtnHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  const noCartItems = cartCtx.items.reduce(
    (itemUnit, item) => (itemUnit += item.amount),
    0
  );
  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={styles.badge}>{noCartItems}</span>
    </button>
  );
}

export default HeaderButton;
