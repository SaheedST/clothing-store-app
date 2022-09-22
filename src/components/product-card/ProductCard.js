import "./ProductCard.scss";
// import Button from "../buttonComponent/Button";
import { useContext } from "react";
import { CartItemContext } from "../../contexts/CartItemContext";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemtoCart } = useContext(CartItemContext);
  const addItemtoCartHandler = () => {
    addItemtoCart(product);
}

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <button  onClick={addItemtoCartHandler}>
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
