import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    quantity: number;
    thumbnail: string;
    discountedPrice: number;
    total: number;
}

const initialState = {
    products: [] as Product[],
    status: "idle",
    isLoading: false,
    sortOrder: "",
};

export const sortAZFetch = createAsyncThunk(
    "az/sortAZFetch",
    async (sortOrder: string) => {
        const res = await axios.get(
            `https://dummyjson.com/products?sortBy=title&order=${sortOrder}`
        );
        return { products: res.data.products, sortOrder };
    }
);

const azSlice = createSlice({
    name: "az",
    initialState,
    reducers: {
        toggleSortOrder: (state) => {
            if (state.sortOrder === "") {
                state.sortOrder = "asc";
            } else {
                state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sortAZFetch.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(sortAZFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.isLoading = false;
                state.products = action.payload.products;
                state.sortOrder = action.payload.sortOrder;
            })
            .addCase(sortAZFetch.rejected, (state) => {
                state.status = "failed";
                state.isLoading = false;
            });
    },
});

export const { toggleSortOrder } = azSlice.actions;
export default azSlice.reducer;
