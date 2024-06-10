import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loadingUser: false,
    user: [],
    errorUser: '',
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    const token = localStorage.getItem('token');
    return await axios
        .get('http://localhost:4000/user/profile', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
});

export const updateUserInfo = createAsyncThunk('user/updateUserInfo', async (userInfo) => {
    const token = localStorage.getItem('token');
    return await axios
        .put('http://localhost:4000/user/profile', userInfo, {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loadingUser = true;
            console.log(1)
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.user = action.payload;
            state.errorUser = '';
            console.log(2)
        })
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.loadingUser = false;
            state.user = [];
            state.errorUser = action.error.message;
            console.log(3)
        })
        builder.addCase(updateUserInfo.pending, (state) => {
            state.loadingUser = true;
        })
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.user = action.payload;
            state.errorUser = '';
        })
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.loadingUser = false;
            state.user = [];
            state.errorUser = action.error.message;
        })
    }
})

export default userSlice.reducer;