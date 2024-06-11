import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/productSlice';
import userSlice from '../features/user/userSlice';
import cartSlice from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;