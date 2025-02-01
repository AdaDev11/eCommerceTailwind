import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Container, Grid, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import "@mantine/carousel/styles.css";
import Button from "@mui/joy/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const PRIMARY_COL_HEIGHT = "300px";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products/${id}`
                );
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <h1>Product not found</h1>;

    return (
        <Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Carousel
                    height={PRIMARY_COL_HEIGHT}
                    slideSize="100%"
                    withIndicators
                    loop
                >
                    {product.images.map((image, index) => (
                        <Carousel.Slide key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Carousel.Slide>
                    ))}
                </Carousel>

                <Grid gutter="md">
                    <Grid.Col>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                padding: "10px",
                            }}
                        >
                            <Text size="xl" weight="bold">
                                {product.title}
                            </Text>
                            <Text>{product.description}</Text>
                        </div>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                padding: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Text size="lg" weight="bold">
                                Price: ${product.price}
                            </Text>
                            <Text>Quantity: {product.quantity}</Text>
                        </div>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                display: "blok",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                variant="soft"
                                size="md"
                                color="primary"
                                sx={{
                                    ml: "auto",
                                    width: "100%",
                                    padding: "4%",
                                    margin: "4%",
                                }}
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant="soft"
                                color="neutral"
                                onClick={() => navigate(-1)}
                                sx={{
                                    ml: "auto",
                                    width: "100%",
                                    padding: "2%",
                                    margin: "4%",
                                }}
                            >
                                <KeyboardBackspaceIcon />
                            </Button>
                        </div>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
};

export default ProductDetails;
