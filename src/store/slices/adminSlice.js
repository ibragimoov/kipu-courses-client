import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import nookies from "nookies";

const initialState = {
    login: null,
    name: null,
    token: null,
};

export const signIn = createAsyncThunk("signin", async (adminDto) => {
    const { data } = await axios.post("auth/login", adminDto);

    return await data.token;
});

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.token = payload;
            nookies.set(null, "jwt", payload);
        },
    },
});

export default adminSlice.reducer;
