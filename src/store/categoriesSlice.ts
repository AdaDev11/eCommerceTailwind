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
    error: null as string | null,
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

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoriesFetch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoriesFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.map((slug, index) => {
                    if (typeof slug === "string") {
                        return {
                            slug: `unknown-${index}`,
                            name: "Unknown",
                            url: "#",
                        };
                    }
                    return {
                        id: index,
                        slug,
                        name: slug.name,
                        url: `https://dummyjson.com/products/category/${slug}`,
                    };
                });
            })
            .addCase(categoriesFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
