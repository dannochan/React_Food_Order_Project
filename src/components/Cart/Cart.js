import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (event) => {
    setIsCheckingOut(true);
  };

  const orderConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-playground-b0b9f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    setIsSubmitting(false);
    setOrderSubmitted(true);
    cartCtx.clearItem();
  };

  const showCartActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const itemsList = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <>
      {itemsList}

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout
          onCancel={props.onCloseCart}
          onAddOrder={orderConfirmHandler}
        />
      )}
      {!isCheckingOut && showCartActions}
    </>
  );

  const submittingModalContent = <p>Sending order....</p>;
  const submittedModalContent = (
    <>
      <p>Order submitted!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !orderSubmitted && modalContent}
      {isSubmitting && submittingModalContent}
      {orderSubmitted && !isSubmitting && submittedModalContent}
    </Modal>
  );
}

export default Cart;
