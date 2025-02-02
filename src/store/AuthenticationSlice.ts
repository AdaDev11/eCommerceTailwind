import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id: number | null;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

const initialState = {
    user: null as User | null,
    accessToken: "",
    refreshToken: "",
    status: "idle",
};

export const fetchAuthentication = createAsyncThunk(
    "authentication/fetchAuthentication",
    async (
        userData: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(
                `https://dummyjson.com/auth/login`,
                userData
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = "";
            state.refreshToken = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthentication.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAuthentication.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(fetchAuthentication.rejected, (state) => {
                state.status = "error";
            });
    },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
