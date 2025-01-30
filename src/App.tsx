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
import NavbarSearch from "./components/userPage/userPage.tsx";

function App() {
    return (
        <Provider store={store}>
            <MantineProvider>
                <PrimarySearchAppBar />
                <LeadGrid />

                <Router>
                    <Routes>
                        <Route path="/" element={<ProductContainer />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                    </Routes>
                </Router>
                <NavbarSearch />
            </MantineProvider>
        </Provider>
    );
}

export default App;
