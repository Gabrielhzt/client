import React, { useEffect } from 'react';
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
import Login from './Login/login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/products/productSlice';

function App() {
  const { loading, products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home loading={loading} products={products} error={error} />} />
        <Route path='/product/:id' element={<Product loading={loading} products={products} error={error} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account/' element={<Account />}>
          <Route path='personal-info' element={<Info />} />
          <Route path='order-history' element={<History />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
