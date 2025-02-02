import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import store from "./store/store.ts";
import PrimarySearchAppBar from "./components/Header.tsx";
import LeadGrid from "./components/Home.tsx";
import Carusel from "./components/carusel.tsx";
import ProductContainer from "./components/shop.tsx";
import ProductDetails from "./components/productDetails.tsx";
// import NavbarSearch from "./components/userPage/loginNavbar.tsx";
// import AuthenticationTitle from "./components/AuthenticationTitle.tsx";

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

                            <Route path="*" element={<h1>Page Not Found</h1>} />
                        </Routes>
                    </Router>
                </MantineProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
