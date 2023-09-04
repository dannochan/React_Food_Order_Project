import { Fragment, useState } from "react";
import Header from "./components/layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [showedCart, setShowedCart] = useState(false);

  const showCartHandler = () => {
    setShowedCart(true);
  };

  const hideCartHandler = () => {
    setShowedCart(false);
  };
  return (
    <Fragment>
      {showedCart && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
