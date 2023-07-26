/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { PRODUCTS } from './test.js';
export const ShopContext = createContext(null);

const initializeCart = () => {
   let cart = {};
   PRODUCTS.forEach(product => {
      cart[product.id] = 0;
   });
   return cart;
};
const ShopContextProvider = props => {
   const products = PRODUCTS;
   const [cartItems, setCartItems] = useState(initializeCart());

   const addQtyToCart = (id, qty) => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] + qty };
      });
   };
   const addItemToCart = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] + 1 };
      });
   };

   const removeItemFromCart = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] - 1 };
      });
   };

   const clearCart = () => {
      setCartItems(initializeCart());
   };

   const clearItem = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: 0 };
      });
   };

   const cartItemsCount = Object.keys(cartItems).reduce((total, id) => {
      return total + cartItems[id];
   }, 0);

   const contextValue = {
      cartItems,
      addItemToCart,
      removeItemFromCart,
      addQtyToCart,
      clearCart,
      clearItem,
      cartItemsCount,
      products,
   };

   // console.log(cartItems);
   return (
      <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
   );
};

export default ShopContextProvider;
