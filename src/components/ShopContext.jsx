/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
export const ShopContext = createContext(null);

const ShopContextProvider = props => {
   const PRODUCTS_URL = 'https://fakestoreapi.com/products';
   const ORDERS_URL = 'https://64c3f4ef67cfdca3b6608237.mockapi.io/myStore/orders';
   const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState({});
   const [orderDetails, setOrderDetails] = useState({ items: {} });
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch(PRODUCTS_URL);
            const data = await response.json();
            setProducts(data);
            setCartItems(initializeCart(data));
         } catch (error) {
            console.log(error);
         }
      };
      fetchProducts();
   }, []);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await fetch(ORDERS_URL);
            const data = await response.json();
            // console.log(data);
            setOrders(data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchOrders();
   }, []);

   const initializeCart = products => {
      let cart = {};
      products.forEach(product => {
         cart[product.id] = 0;
      });
      return cart;
   };

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
      setCartItems(initializeCart(products));
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
      orderDetails,
      setOrderDetails,
      orders,
      setOrders,
   };

   // console.log(cartItems);
   return (
      <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
   );
};

export default ShopContextProvider;
