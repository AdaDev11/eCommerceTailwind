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
                state.products = action.payload.map((category, index) => {
                    if (typeof category === "string") {
                        return {
                            slug: `unknown-${index}`,
                            name: "Unknown",
                            url: "#",
                        };
                    }
                    // Correctly extract the slug string from the object
                    return {
                        id: index,
                        slug: category.slug, // Use the `slug` property directly here
                        name: category.name,
                        url: `https://dummyjson.com/products/category/${category.slug}`, // Fix URL
                    };
                });
            })
            .addCase(categoriesFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCategoryFilter } = categorySlice.actions;
export default categorySlice.reducer;
