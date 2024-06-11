import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loadingCart: false,
    cart: [],
    errorCart: '',
    updatingQuantity: false,
    errorUpdate: ''
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

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ orderDetailId, quantity }) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/orders/quantity', { orderDetailId, quantity }, {
            headers: {
                'Authorization': token
            }
        })
        .then(() => ({ orderDetailId, quantity }));
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
        builder.addCase(updateQuantity.pending, (state) => {
            state.updatingQuantity = true;
        })
        builder.addCase(updateQuantity.fulfilled, (state, action) => {
            state.updatingQuantity = false;
            const { orderDetailId, quantity } = action.payload;
            const item = state.cart.find(item => item.orders_detail_id === orderDetailId);
            if (item) {
                item.quantity = quantity;
            }
            state.errorUpdate = '';
        })
        builder.addCase(updateQuantity.rejected, (state, action) => {
            state.updatingQuantity = false;
            state.errorUpdate = action.error.message || 'Failed to update quantity';
        })
    }
})

export default cartSlice.reducer;