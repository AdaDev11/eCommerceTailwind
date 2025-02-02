// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice.ts";
import searchReducer from "./searchSlice.ts";
import azReducer from "./sortAZ.ts";
import categoryReducer from "./categoriesSlice.ts";
// import authenticationReducer from "./AuthenticationSlice.ts";

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer,
        az: azReducer,
        category: categoryReducer,
        // authentication: authenticationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
