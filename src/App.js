import { useState } from "react";
import Header from "./components/layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [showedCart, setShowedCart] = useState(false);

  const showCartHandler = () => {
    setShowedCart(true);
  };

  const hideCartHandler = () => {
    setShowedCart(false);
  };
  return (
    <CartContextProvider>
      {showedCart && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
