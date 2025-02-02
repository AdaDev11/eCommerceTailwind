import { Grid, Card, CardContent, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    quantity: number;
    thumbnail: string;
    discountedPrice: number;
    total: number;
}

interface BasicCardProps {
    products: Product[];
}

const BasicCard: React.FC<BasicCardProps> = ({ products }) => {
    const navigate = useNavigate();

    const handleImageClick = (productId: number) => {
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
                                variant="body2"
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
                            component="div"
                            sx={{
                                display: "flex",
                                alignItems: "stretch",
                                gap: "10px",
                            }}
                        >
                            <div>
                                <Typography variant="body2">Price:</Typography>
                                <Typography
                                    sx={{
                                        fontSize: "lg",
                                        fontWeight: "bold",
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
