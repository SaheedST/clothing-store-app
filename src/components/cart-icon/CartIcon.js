import "./CartIcon.scss";
import { ReactComponent as ShoppingCart } from "../../assets/ShoppingBag.svg";
import { useContext } from "react";
import { CartItemContext } from "../../contexts/CartItemContext";

const CartIcon = () => {
  const { showCart, setShowCart, cartCount } = useContext(CartItemContext);

  const cartToggle = () => {
    setShowCart(!showCart);
  };

  return (
    <div onClick={cartToggle} className="cart-icon-container">
      <ShoppingCart className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
