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
import PrivateRoute from './components/privateRoute/privateRoute';
import { fetchUserInfo, updateUserInfo } from './features/user/userSlice';
import AuthRoute from './components/authRoute/authRoute';

function App() {
  const { loading, products, error } = useSelector((state) => state.products);
  const { loadingUser, user, errorUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchUserInfo())
  }, [1])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home loading={loading} products={products} error={error} />} />
        <Route path='/product/:id' element={<Product loading={loading} products={products} error={error} />} />
        <Route element={<PrivateRoute loadingUser={loadingUser} user={user} errorUser={errorUser} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />}>
            <Route path="personal-info" element={<Info loadingUser={loadingUser} user={user} errorUser={errorUser} />} />
            <Route path="order-history" element={<History />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>
        <Route element={<AuthRoute loadingUser={loadingUser} user={user} errorUser={errorUser} />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
