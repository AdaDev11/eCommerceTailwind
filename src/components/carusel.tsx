import axios from "axios"; // ✅ To‘g‘ri import
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchProductsForImgs = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products.flatMap((p: { images: string[] }) => p.images[0]);
};

const Carusel = () => {
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    const {
        data: images,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["images"],
        queryFn: fetchProductsForImgs,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Carousel
                withIndicators
                height={200}
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                slidesToScroll={2}
                slideSize="33%"
                align="start"
                style={{
                    padding: "2%",
                    margin: "2.8%",
                }}
            >
                {images.length > 0 &&
                    images.map((image: string) => (
                        <Carousel.Slide>
                            <img
                                src={image}
                                alt={`Slide `}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Carousel.Slide>
                    ))}
            </Carousel>
        </>
    );
};

export default Carusel;
