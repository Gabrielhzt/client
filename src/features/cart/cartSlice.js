import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loadingCart: false,
    cart: [],
    errorCart: ''
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .get('http://localhost:4000/orders/', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loadingCart = true;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loadingCart = false;
            state.cart = action.payload;
            state.errorCart = '';
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loadingCart = false;
            state.cart = [];
            state.errorCart = action.error.message;
        })
    }
})

export default cartSlice.reducer;