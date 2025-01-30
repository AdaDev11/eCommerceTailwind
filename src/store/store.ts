// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice.ts";
import searchReducer from "./searchSlice.ts";
import azReducer from "./sortAZ.ts";
import categoryReducer from "./categoriesSlice.ts";

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer,
        az: azReducer,
        category: categoryReducer,
    },
});

export default store;
