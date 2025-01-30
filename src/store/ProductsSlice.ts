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
    isLoading: false,
    total: 0,
    limit: 4,
    skip: 0,
    searchQuery: "",
    cart: [] as { product: Product; quantity: number }[],
    cartAll: [] as { product: Product; quantity: number }[],
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ limit, skip }: { limit: number; skip: number }) => {
        const response = await axios.get(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,description,category,images`
        );
        return response.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default productsSlice.reducer;
