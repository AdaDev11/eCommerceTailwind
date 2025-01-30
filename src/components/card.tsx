import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { useNavigate } from "react-router-dom";

const BasicCard = ({ products, productsSearch }) => {
    const navigate = useNavigate();

    const handleImageClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
            {products.map((product) => (
                <Grid item xs={9} sm={6} md={3} key={product.id}>
                    <Card
                        sx={{
                            width: "80%",
                            minHeight: "400px",
                            padding: "10px",
                        }}
                    >
                        <div>
                            <Typography level="body-sm">
                                Category: {product.category}
                            </Typography>
                        </div>
                        <AspectRatio
                            minHeight="120px"
                            maxHeight="200px"
                            onClick={() => handleImageClick(product.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                loading="lazy"
                            />
                        </AspectRatio>
                        <CardContent
                            orientation="horizontal"
                            sx={{ display: "flex" }}
                        >
                            <div>
                                <Typography level="body-xs">Price:</Typography>
                                <Typography
                                    sx={{
                                        fontSize: "lg",
                                        fontWeight: "lg",
                                    }}
                                >
                                    ${product.price}
                                </Typography>
                            </div>
                            <Button
                                variant="solid"
                                size="md"
                                color="primary"
                                sx={{ ml: "auto", alignSelf: "center" }}
                            >
                                Buy Now
                            </Button>
                        </CardContent>

                        <Typography
                            level="title-lg"
                            variant="h6"
                            sx={{ minHeight: "40px", alignItems: "center" }}
                        >
                            {product.title}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </>
    );
};

export default BasicCard;
