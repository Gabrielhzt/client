import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/productSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice
  },
});

export default store;