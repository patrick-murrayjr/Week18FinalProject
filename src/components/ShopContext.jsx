/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import apiRequest from './apiRequest';
export const ShopContext = createContext(null);

/**
 * ShopContextProvider component
 *
 * This is the code for the ShopContextProvider component.
 * It provides the context for the application.
 *
 * The context provides the following:
 * - cart items: an object with the product id as the key and the quantity as the value
 * - add item to cart: a function to add an item to the cart
 * - remove item from cart: a function to remove an item from the cart
 * - add quantity to cart: a function to add a quantity to the cart
 * - clear cart: a function to clear the cart
 * - clear item: a function to clear an item from the cart
 * - cart items count: the total number of items in the cart
 * - products: an array of products
 * - order details: an object with the order details
 * - set order details: a function to set the order details
 * - orders: an array of orders
 * - set orders: a function to set the orders
 * - create new order: a function to create a new order
 * - edit order: a function to edit an order
 * - delete order: a function to delete an order
 * - id to edit: the id of the order to edit
 * - set id to edit: a function to set the id of the order to edit
 *
 */
const ShopContextProvider = props => {
   // the url to retrieve the products from the API
   const PRODUCTS_URL = 'https://fakestoreapi.com/products';
   // the url to retrieve the orders from the API
   const ORDERS_URL = 'https://64c3f4ef67cfdca3b6608237.mockapi.io/myStore/orders';

   // the application state
   const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState({});
   const [orderDetails, setOrderDetails] = useState({ items: {} });
   const [orders, setOrders] = useState([]);
   const [fetchError, setFetchError] = useState(null);
   const [idToEdit, setIdToEdit] = useState(0);

   // This code uses the fetch API to retrieve the products from the API.
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch(PRODUCTS_URL);
            const data = await response.json();
            setProducts(data);
            setCartItems(initializeCart(data));
         } catch (error) {
            console.log(error);
            setFetchError(error);
         }
      };
      fetchProducts();
   }, []);

   // This code uses the fetch API to retrieve the orders from the API.
   const fetchOrders = async () => {
      try {
         const response = await fetch(ORDERS_URL);
         const data = await response.json();
         setOrders(data);
      } catch (error) {
         console.log(error);
         setFetchError(error);
      }
   };

   // This code uses the fetch API to retrieve the orders from the API on initial load.
   useEffect(() => {
      fetchOrders();
   }, []);

   // This code uses the fetch API to  add a new order to the API.
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
      fetchOrders();
   };

   // This code uses the fetch API to edit the order in the API.
   const editOrder = async (order, id) => {
      const putOptions = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(order),
      };
      const result = await apiRequest(`${ORDERS_URL}/${id}`, putOptions);
      if (result) {
         setFetchError(result);
      }
      const newOrder = orders.map(item => (item.id === order.id ? order : item));
      setOrders(newOrder);
      fetchOrders();
   };

   // This code uses the fetch API to delete an order from the API.
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
      fetchOrders();
   };

   // This code initializes the cart with the products.
   const initializeCart = products => {
      let cart = {};
      products.forEach(product => {
         cart[product.id] = 0;
      });
      return cart;
   };

   // This code adds a quantity of an item to the cart.
   const addQtyToCart = (id, qty) => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] + qty };
      });
   };

   // This code adds a single item to the cart.
   const addItemToCart = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] + 1 };
      });
   };

   // This code removes a single item from the cart.
   const removeItemFromCart = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: prevState[id] - 1 };
      });
   };

   // This code clears the cart.
   const clearCart = () => {
      setCartItems(initializeCart(products));
   };

   // This code clears an item from the cart.
   const clearItem = id => {
      setCartItems(prevState => {
         return { ...prevState, [id]: 0 };
      });
   };

   // This code calculates the total number of items in the cart.
   const cartItemsCount = Object.keys(cartItems).reduce((total, id) => {
      return total + cartItems[id];
   }, 0);

   // the context values that are available to the application
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
      idToEdit,
      setIdToEdit,
   };

   return (
      <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
   );
};

export default ShopContextProvider;
