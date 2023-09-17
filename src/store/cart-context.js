import { createContext } from "react";

// context component create a default object in cart

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});

export default CartContext;
