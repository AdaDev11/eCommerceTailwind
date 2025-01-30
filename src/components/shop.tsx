import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductsSlice";
import { searchFetch } from "../store/searchSlice.ts";
import BasicCard from "./card.tsx";
import { Grid, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategoryNavbar from "./userPage/userPage.tsx";
import { sortAZFetch } from "../store/sortAZ.ts";

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    },
                },
            },
        },
    },
});

const ProductContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const totalProducts = useSelector((state) => state.products.total);
    const limit = 16;
    const searchQuery = useSelector((state) => state.search.query);
    const sortedProducts = useSelector((state) => state.az.products);
    const productsSearch = useSelector((state) => state.search.products || "");
    const categoryValue = useSelector((state) => state.category.categoryValue);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const skip = (currentPage - 1) * limit;
        dispatch(fetchProducts({ limit, skip }));
        dispatch(searchFetch(searchQuery));
    }, [dispatch, currentPage, searchQuery]);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const filteredProducts = categoryValue
        ? products.filter((product) => product.category === categoryValue)
        : products;

    const paginatedSearchResults = searchQuery
        ? productsSearch.slice((currentPage - 1) * limit, currentPage * limit)
        : sortedProducts.length > 0
        ? sortedProducts.slice((currentPage - 1) * limit, currentPage * limit)
        : filteredProducts.length > 0 // filteredProducts ni qo'shish
        ? filteredProducts.slice((currentPage - 1) * limit, currentPage * limit)
        : products;

    return (
        <div
            style={{
                width: "100%",
                padding: "20px",
                margin: "20px",
            }}
        >
            <ThemeProvider theme={theme}>
                <Pagination
                    count={Math.ceil(totalProducts / limit)}
                    page={currentPage}
                    onChange={(event, value) => handleChangePage(value)}
                />
            </ThemeProvider>

            <div
                style={{
                    width: "100%",
                    padding: "20px",
                    margin: "20px",
                    display: "flex",
                }}
            >
                <Grid
                    container
                    spacing={2}
                    style={{
                        width: "80%",
                        padding: "20px",
                        margin: "20px",
                    }}
                >
                    <BasicCard products={paginatedSearchResults} />
                </Grid>

                <CategoryNavbar />
            </div>
        </div>
    );
};

export default ProductContainer;
