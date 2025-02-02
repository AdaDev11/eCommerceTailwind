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

export interface Category {
    slug: string;
    name: string;
    url: string;
}

const initialState = {
    categories: [] as Category[],
    products: [] as Product[],
    isLoading: false,
    categoryValue: "",
};

export const categoriesFetch = createAsyncThunk(
    "category/categoriesFetch",
    async () => {
        const res = await axios.get(
            "https://dummyjson.com/products/categories"
        );
        return res.data;
    }
);

export const productsForCategoryFetch = createAsyncThunk(
    "category/productsForCategoryFetch",
    async (categoryValue: string) => {
        const res = await axios.get(
            `https://dummyjson.com/products/category/${categoryValue}`
        );
        return res.data.products;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryFilter(state, action) {
            state.categoryValue = action.payload;
            console.log(state.categoryValue);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(categoriesFetch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoriesFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(categoriesFetch.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(productsForCategoryFetch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(productsForCategoryFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(productsForCategoryFetch.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCategoryFilter } = categorySlice.actions;
export default categorySlice.reducer;
