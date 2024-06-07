import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Product from './Product/product';
import Cart from './Cart/cart';
import Account from './Account/Account';
import Info from './Account/Info/info';
import History from './Account/History/history';
import Wishlist from './Account/Wishlist/wishlist';
import Signup from './Signup/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account/' element={<Account />}>
          <Route path='personal-info' element={<Info />} />
          <Route path='order-history' element={<History />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
