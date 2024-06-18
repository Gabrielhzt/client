import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loadingCart: false,
    cart: [],
    cartHistory: [],
    cartHistoryLoading: false,
    cartHistoryError: '',
    total: 0,
    totalItems: 0,
    totalItemsLoading: false,
    errorItems: '',
    errorCart: '',
    updatingQuantity: false,
    allQuantity: [],
    errorUpdate: ''
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .get('http://localhost:4000/orders/', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ orderDetailId, quantity, orderId }) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/orders/quantity', { orderDetailId, quantity, orderId }, {
            headers: {
                'Authorization': token
            }
        })
        .then(() => ({ orderDetailId, quantity }));
});

export const removeItem = createAsyncThunk('cart/removeItem', async (orderDetailId) => {
    const token = localStorage.getItem('token');
    return await axios
        .delete('http://localhost:4000/orders/remove', {
            data: { order_detail_id: orderDetailId },
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

export const updateTotalPrice = createAsyncThunk('cart/updateTotalPrice', async ({ orderId }) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/orders/total', { orderId }, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

export const addProductToCart = createAsyncThunk('cart/addProductToCart', async ({ productId, quantity, price }) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/orders/addproduct', { productId, quantity, price }, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

export const getTotalItems = createAsyncThunk('cart/totalItems', async ({ orderId }) => {
    const token = localStorage.getItem('token');
    return await axios
        .get(`http://localhost:4000/orders/totalItems?orderId=${orderId}`, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

export const validateCart = createAsyncThunk('cart/validateCart', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .post('http://localhost:4000/orders/validate', {}, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

export const getcartHistory = createAsyncThunk('cart/getcartHistory', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .get('http://localhost:4000/orders/validated', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data);
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loadingCart = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loadingCart = false;
                state.cart = action.payload;
                state.errorCart = '';
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loadingCart = false;
                state.cart = [];
                state.errorCart = action.error.message;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.updatingQuantity = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.updatingQuantity = false;
                const { orderDetailId, quantity } = action.payload;
                const itemIndex = state.cart.findIndex(item => item.orders_detail_id === orderDetailId);
                
                if (itemIndex !== -1) {
                    state.cart[itemIndex].quantity = quantity;
                }

                const existingIndex = state.allQuantity.findIndex(item => item.orderDetailId === orderDetailId);
                if (existingIndex !== -1) {
                    state.allQuantity[existingIndex] = { orderDetailId, quantity, timestamp: Date.now() };
                } else {
                    state.allQuantity.push({ orderDetailId, quantity, timestamp: Date.now() });
                }
                
                state.errorUpdate = '';
            })                     
            .addCase(updateQuantity.rejected, (state, action) => {
                state.updatingQuantity = false;
                state.errorUpdate = action.error.message || 'Failed to update quantity';
            })
            .addCase(removeItem.pending, (state) => {
                state.loadingCart = true;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.loadingCart = false;
                state.errorCart = '';
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.loadingCart = false;
                state.errorCart = action.error.message;
            })
            .addCase(updateTotalPrice.pending, (state) => {
                state.loadingCart = true;
            })
            .addCase(updateTotalPrice.fulfilled, (state, action) => {
                state.loadingCart = false;
                state.total = action.payload;
                state.errorCart = '';
            })
            .addCase(updateTotalPrice.rejected, (state, action) => {
                state.loadingCart = false;
                state.total = 0;
                state.errorCart = action.error.message;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.loadingCart = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loadingCart = false;
                state.errorCart = '';
                state.cart = action.payload;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loadingCart = false;
                state.errorCart = action.error.message;
            })
            .addCase(getTotalItems.pending, (state) => {
                state.totalItemsLoading = true;
            })
            .addCase(getTotalItems.fulfilled, (state, action) => {
                state.totalItemsLoading = false;
                state.totalItems = action.payload.totalItem;
                state.errorItems = '';
            })
            .addCase(getTotalItems.rejected, (state, action) => {
                state.totalItemsLoading = true;
                state.totalItems = 0;
                state.errorItems = action.error.message;
            })
            .addCase(validateCart.pending, (state) => {
                state.loadingCart = true;
            })
            .addCase(validateCart.fulfilled, (state, action) => {
                state.loadingCart = false;
                state.cart = [];
                state.errorCart = '';
            })
            .addCase(validateCart.rejected, (state, action) => {
                state.loadingCart = true;
                state.errorCart = action.error.message;
            })
            .addCase(getcartHistory.pending, (state) => {
                state.cartHistoryLoading = true;
            })
            .addCase(getcartHistory.fulfilled, (state, action) => {
                state.cartHistoryLoading = false;
                state.cartHistory = action.payload;
                state.cartHistoryError = '';
            })
            .addCase(getcartHistory.rejected, (state, action) => {
                state.cartHistoryLoading = false;
                state.cartHistoryError = action.error.message;
            })
    }
});

export default cartSlice.reducer;