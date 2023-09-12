import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import nookies from "nookies";

const initialState = {
    login: null,
    name: null,
    token: null,
    error: null
};

export const signIn = createAsyncThunk("signin", async (adminDto, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("auth/login", adminDto);
    
        return await data.token;
    } catch (error) {
        if (!error.response) {
            throw error
        }

        return rejectWithValue(error.response.data)
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.fulfilled]: (state, { payload }) => {
            state.token = payload;
            nookies.set(null, "jwt", payload);
        },
        [signIn.rejected]: (state, { payload }) => {
            state.error = payload.message
        },
    },
});

export default adminSlice.reducer;
