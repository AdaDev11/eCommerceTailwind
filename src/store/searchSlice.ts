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
    searchQuery: "",
    isLoading: false,
    query: "",
};

export const searchFetch = createAsyncThunk(
    "search/searchFetch",
    async (query: string) => {
        const res = await axios.get(
            `https://dummyjson.com/products/search?q=${query}`
        );
        return res.data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchFetch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(searchFetch.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
