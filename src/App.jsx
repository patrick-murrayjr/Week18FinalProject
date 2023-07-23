import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Navigation from './components/Navigation';
import { products } from './components/test';

function App() {
   return (
      <>
         <Navigation />

         <Routes>
            <Route path='/' element={<Shop products={products} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
         </Routes>
      </>
   );
}

export default App;
