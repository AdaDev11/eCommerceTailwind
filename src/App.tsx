import { useState } from "react";
import PrimarySearchAppBar from "./components/Header.tsx";
import LeadGrid from "./components/Home.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import CardsCarousel from "./components/carusel.tsx";
import BasicCard from "./components/card.tsx";
import ArticleCardFooter from "./components/articleCard.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { createStore, combineReducers } from "redux";
import ProductContainer from "./components/shop.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/productDetails.tsx";
import Carusel from "./components/carusel.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <PrimarySearchAppBar />
                    <LeadGrid />
                    <Carusel />

                    <Router>
                        <Routes>
                            <Route path="/" element={<ProductContainer />} />
                            <Route
                                path="/product/:id"
                                element={<ProductDetails />}
                            />
                        </Routes>
                    </Router>
                </MantineProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
