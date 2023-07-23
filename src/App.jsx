import { Routes, Route } from 'react-router-dom';

import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Navigation from './components/Navigation';
import { PRODUCTS } from './components/test';
import ShopContextProvider from './components/ShopContext';

function App() {
   return (
      <>
         <ShopContextProvider>
            <Navigation />
            <Routes>
               <Route path='/' element={<Shop products={PRODUCTS} />} />
               <Route path='/cart' element={<Cart />} />
               <Route path='/orders' element={<Orders />} />
            </Routes>
         </ShopContextProvider>
      </>
   );
}

export default App;