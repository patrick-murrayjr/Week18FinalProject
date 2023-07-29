/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import apiRequest from './apiRequest';
export const ShopContext = createContext(null);

const ShopContextProvider = props => {
   const PRODUCTS_URL = 'https://fakestoreapi.com/products';
   const ORDERS_URL = 'https://64c3f4ef67cfdca3b6608237.mockapi.io/myStore/orders';
   const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState({});
   const [orderDetails, setOrderDetails] = useState({ items: {} });
   const [orders, setOrders] = useState([]);
   const [fetchError, setFetchError] = useState(null);

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

   /***
    * SECTION: CRUD Operations
    */
   // This code uses the fetch API to  add a new blog post to the API.
   const createNewOrder = async order => {
      setOrders([...orders, order]);
      const postOptions = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(order),
      };
      const result = await apiRequest(ORDERS_URL, postOptions);
      if (result) {
         setFetchError(result);
      }
   };

   // This code uses the fetch API to edit a blog post in the API.
   const editOrder = async order => {
      console.log(order.id);
      const putOptions = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(order),
      };
      const result = await apiRequest(`${ORDERS_URL}/${order.id}`, putOptions);
      if (result) {
         setFetchError(result);
      }
      const newOrder = orders.map(item => (item.id === order.id ? order : item));
      setOrders(newOrder);
   };

   // This code uses the fetch API to delete a blog post from the API.
   const deleteOrder = async id => {
      const deleteOptions = {
         method: 'DELETE',
      };
      const result = await apiRequest(`${ORDERS_URL}/${id}`, deleteOptions);
      if (result) {
         setFetchError(result);
      }
      const newOrders = orders.filter(order => order.id !== id);
      setOrders(newOrders);
   };

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
      createNewOrder,
      editOrder,
      deleteOrder,
   };

   // console.log(cartItems);
   return (
      <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
   );
};

export default ShopContextProvider;
