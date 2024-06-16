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
import { fetchUserInfo } from './features/user/userSlice';
import AuthRoute from './components/authRoute/authRoute';
import { fetchCart } from './features/cart/cartSlice';

function App() {
  const { loading, products, error } = useSelector((state) => state.products);
  const { loadingUser, user, errorUser } = useSelector((state) => state.user);
  const { loadingCart, cart, total, allQuantity, errorCart } = useSelector(state => state.cart);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchUserInfo())
    dispatch(fetchCart())
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home loading={loading} products={products} cart={cart} error={error} />} />
        <Route path='/product/:id' element={<Product loading={loading} products={products} error={error} loadingCart={loadingCart} cart={cart} total={total} allQuantity={allQuantity} errorCart={errorCart} />} />
        <Route element={<PrivateRoute loadingUser={loadingUser} user={user} errorUser={errorUser} />}>
          <Route path="/cart" element={<Cart loadingCart={loadingCart} cart={cart} total={total} allQuantity={allQuantity} errorCart={errorCart} />} />
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
