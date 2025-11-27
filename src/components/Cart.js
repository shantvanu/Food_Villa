import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Cart</h1>

      <div>
        <button onClick={handleClearCart}>CLEAR CART</button>
      </div>
      <div>
        <ItemList itemsArray={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
