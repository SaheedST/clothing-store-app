import { useContext } from "react";
import { CartItemContext } from "../../contexts/CartItemContext";
import CheckOutItem from "./CheckOutItem";
import "./CheckOutSummary.scss";

const CheckOutSummary = () => {
  const { cartItems, cartTotal } = useContext(CartItemContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">Product</div>
        <div className="header-block">Description</div>
        <div className="header-block">Quantity</div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>
      {cartItems.map((lineItem) => (
        <CheckOutItem key={lineItem.id} cartItem={lineItem} />
      ))}
      <div className="total">Total: ${cartTotal}</div>
    </div>
  );
};

export default CheckOutSummary;
