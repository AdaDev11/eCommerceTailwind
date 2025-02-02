import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductsSlice";
import { searchFetch } from "../store/searchSlice.ts";
import BasicCard from "./card.tsx";
import { Grid, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategoryNavbar from "./userPage/userPage.tsx";
import { RootState, AppDispatch } from "../store/store.ts";

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
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
    const totalProducts = useSelector(
        (state: RootState) => state.products.total
    );
    const limit = 16;
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const sortedProducts = useSelector((state: RootState) => state.az.products);
    const productsSearch = useSelector(
        (state: RootState) => state.search.products || ""
    );
    // const categoryValue = useSelector(
    //     (state: RootState) => state.category.categoryValue
    // );

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const skip = (currentPage - 1) * limit;
        dispatch(fetchProducts({ limit, skip }));
        dispatch(searchFetch(searchQuery));
    }, [dispatch, currentPage, searchQuery]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    // const filteredProducts = categoryValue
    //     ? products.filter((product) => product.category === categoryValue)
    //     : products;

    const paginatedSearchResults = searchQuery
        ? productsSearch.slice((currentPage - 1) * limit, currentPage * limit)
        : sortedProducts.length > 0
        ? sortedProducts.slice((currentPage - 1) * limit, currentPage * limit)
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
                    sx={{
                        alignItems: "center",
                    }}
                    style={{
                        display: "flex",
                        padding: "1%",
                        margin: "1%",
                        justifyContent: "center",
                    }}
                    onChange={(event, value) => {
                        handleChangePage(value), console.log(event);
                    }}
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
