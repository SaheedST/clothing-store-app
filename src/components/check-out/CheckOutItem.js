import "./CheckOutItem.scss";
import { useContext } from "react";
import { CartItemContext } from "../../contexts/CartItemContext";

const CheckOutItem = ({ cartItem }) => {
  const { imageUrl, quantity, linePrice, name } = cartItem;

  const { addItemtoCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartItemContext);

  const addItemHandler = () => {
    addItemtoCart(cartItem);
  };
  const removeItemHandler = () => {
    removeItemFromCart(cartItem);
  };
  const deleteItemHandler = () => {
    deleteItemFromCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </div>
      <div className="price">{linePrice}</div>
      <div className="remove-button" onClick={deleteItemHandler}>
        🗑️
      </div>
    </div>
  );
};

export default CheckOutItem;
