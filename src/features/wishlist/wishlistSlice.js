import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loadingWishlist: false,
    wishlist: [],
    errorWishlist: ''
}

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .get('http://localhost:4000/wishlist/', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

export const addInWishlist = createAsyncThunk('wishlist/addInWishlist', async ({productId}) => {
    const token = localStorage.getItem('token');
    return await axios
        .post('http://localhost:4000/wishlist/add', {productId}, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({productId}) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/wishlist/remove', {productId}, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getWishlist.pending, (state) => {
            state.loadingWishlist = true;
        })
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = action.payload;
            state.errorWishlist = '';
        })
        builder.addCase(getWishlist.rejected, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = [];
            state.errorWishlist = action.error.message;
        })
        builder.addCase(addInWishlist.pending, (state) => {
            state.loadingWishlist = true;
        })
        builder.addCase(addInWishlist.fulfilled, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = action.payload;
            state.errorWishlist = '';
        })
        builder.addCase(addInWishlist.rejected, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = [];
            state.errorWishlist = action.error.message;
        })
        builder.addCase(removeFromWishlist.pending, (state) => {
            state.loadingWishlist = true;
        })
        builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = action.payload;
            state.errorWishlist = '';
        })
        builder.addCase(removeFromWishlist.rejected, (state, action) => {
            state.loadingWishlist = false;
            state.wishlist = [];
            state.errorWishlist = action.error.message;
        })
    }
})

export default wishlistSlice.reducer;