import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loadingUser: false,
    user: [],
    errorUser: '',
};

const token = localStorage.getItem('token');

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', () => {
    return axios
        .get('http://localhost:4000/user/profile', {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => response.data)
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loadingUser = true;
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.user = action.payload;
            state.errorUser = '';
        })
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.loadingUser = false;
            state.user = [];
            state.errorUser = action.error.message;
        })
    }
})

export default userSlice.reducer;