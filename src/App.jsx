import { Routes, Route } from 'react-router-dom';

import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Confirmation from './components/Confirmation';
import EditOrder from './components/EditOrder';
import Navigation from './components/Navigation';
import ShopContextProvider from './components/ShopContext';

/**
 * APP component
 *
 * This is the code for the App component
 * It provides the routes for the Shop, Cart, Orders, Confirmation, and EditOrder pages
 * It also provides the ShopContextProvider
 *
 */
function App() {
   return (
      <>
         <ShopContextProvider>
            <Navigation />
            <Routes>
               <Route path='/' element={<Shop />} />
               <Route path='/cart' element={<Cart />} />
               <Route path='/orders' element={<Orders />} />
               <Route path='/confirmation' element={<Confirmation />} />
               <Route path='/editorder' element={<EditOrder />} />
            </Routes>
         </ShopContextProvider>
      </>
   );
}

export default App;
