import Button from "../buttonComponent/Button";
import "./CartDropdown.scss";
import { useContext } from "react";
import { CartItemContext } from "../../contexts/CartItemContext";
import CartItem from "../cart-item/CartItem";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartItemContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="/checkout">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
