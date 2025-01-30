import { Box } from "@mantine/core";
import classes from "../../style/NavbarSearch.module.css";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useDispatch, useSelector } from "react-redux";
import { sortAZFetch, toggleSortOrder } from "../../store/sortAZ.ts";
import {
    categoriesFetch,
    setCategoryFilter,
} from "../../store/categoriesSlice.ts";
import { useEffect } from "react";

function CategoryNavbar() {
    const dispatch = useDispatch();
    const sortOrder = useSelector((state) => state.az.sortOrder);
    const categories = useSelector((state) => state.category.products);
    const isLoading = useSelector((state) => state.category.isLoading);

    useEffect(() => {
        dispatch(categoriesFetch());
    }, [dispatch]);

    const handleSortAZ = () => {
        dispatch(toggleSortOrder());
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        dispatch(sortAZFetch(newSortOrder));
    };

    const handleCategoryClick = (categoryName) => {
        dispatch(setCategoryFilter(categoryName)); // Set category filter
    };

    if (isLoading) return <p>Loading...</p>;

    const categoryLinks = Array.isArray(categories)
        ? categories.map((category, index) => (
              <a
                  href={category.url}
                  onClick={(event) => {
                      event.preventDefault();
                      handleCategoryClick(category.slug);
                  }}
                  key={index}
                  className={classes.collectionLink}
              >
                  <Box component="span" mr={9} fz={16}>
                      📦
                  </Box>
                  {category.name}
              </a>
          ))
        : [];

    return (
        <nav className={classes.navbar}>
            <div
                style={{
                    padding: "10px",
                    margin: "10px",
                    cursor: "pointer",
                }}
            >
                <SortByAlphaIcon onClick={handleSortAZ} />
            </div>
            <div className={classes.section}>
                <div className={classes.collections}>{categoryLinks}</div>
            </div>
        </nav>
    );
}

export default CategoryNavbar;
