import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";

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
                            maxHeight: "300px",
                            padding: "10px",
                        }}
                    >
                        <div>
                            <Typography
                                level="body-sm"
                                sx={{
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
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
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </AspectRatio>
                        <CardContent
                            orientation="horizontal"
                            sx={{
                                display: "flex",
                                alignItems: "stretch",
                                gap: "10px",
                            }}
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
                                variant="soft"
                                size="md"
                                color="primary"
                                sx={{
                                    ml: "auto",
                                    maxWidth: "40%",
                                }}
                            >
                                Buy Now
                            </Button>
                        </CardContent>

                        <Typography
                            level="title-lg"
                            variant="h6"
                            sx={{
                                maxWidth: "100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
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
