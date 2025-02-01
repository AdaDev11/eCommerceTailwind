import { Container, Grid, SimpleGrid } from "@mantine/core";
import image from "../assets/images.jpg";
import image2 from "../assets/images (1).jpg";
import image3 from "../assets/images (2).jpg";

const PRIMARY_COL_HEIGHT = "400px";

export function LeadGrid() {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    return (
        <Container
            my="md"
            style={{
                maxWidth: "1200px",
                marginTop: "2.8%",
                padding: "2%",
            }}
        >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <div className="skeleton-text" style={{ padding: "20px" }}>
                    <h1
                        style={{
                            fontFamily: '"Pacifico", serif',
                            fontSize: "48px",
                        }}
                    >
                        Shop
                    </h1>
                    <p
                        style={{
                            fontFamily: '"Pacifico", serif',
                            fontSize: "48px",
                        }}
                    >
                        Style
                    </p>
                </div>

                <Grid gutter="md">
                    <Grid.Col span={12}>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={image}
                                alt="Example 1"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={image2}
                                alt="Example 2"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <div
                            style={{
                                height: SECONDARY_COL_HEIGHT,
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={image3}
                                alt="Example 3"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}

export default LeadGrid;
