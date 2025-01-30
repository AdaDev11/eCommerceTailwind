import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
    Container,
    Grid,
    SimpleGrid,
    Skeleton,
    Button,
    Text,
} from "@mantine/core";

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
                    styles={{
                        root: { borderRadius: "8px", overflow: "hidden" },
                    }}
                >
                    {product.images.map((image, index) => (
                        <Carousel.Slide key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
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
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                variant="filled"
                                color="blue"
                                onClick={() => navigate(-1)}
                                style={{ marginTop: "20px" }}
                            >
                                Go Back
                            </Button>
                        </div>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
};

export default ProductDetails;
