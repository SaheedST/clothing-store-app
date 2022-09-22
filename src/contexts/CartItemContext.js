import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // 1. check if item with same id is already in cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // 2. update quantity of additional item that already existed in cart
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            linePrice: (cartItem.quantity + 1) * cartItem.price,
          }
        : cartItem
    );
  }

  // 3. return new array with modified quantity / new item
  return [
    ...cartItems,
    { ...productToAdd, quantity: 1, linePrice: productToAdd.price },
  ];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // check if quantity = 1, if so, remove item from cart
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return cart items with matching cart item and reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          linePrice: (cartItem.quantity - 1) * cartItem.price,
        }
      : cartItem
  );
};

const deleteCartItem = (cartItems, itemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

export const CartItemContext = createContext({
  showCart: true,
  setShowCart: () => {},
  cartItems: [],
  addItemtoCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  deleteItemFromCart: () => {},
});

export const CartItemProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemtoCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const deleteItemFromCart = (itemToDelete) => {
    setCartItems(deleteCartItem(cartItems, itemToDelete));
  };

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce((total, cartItem) => total + cartItem.linePrice, 0)
    );
  }, [cartItems]);

  const value = {
    showCart,
    setShowCart,
    addItemtoCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemFromCart,
    deleteItemFromCart,
  };
  return (
    <CartItemContext.Provider value={value}>
      {children}
    </CartItemContext.Provider>
  );
};
