import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const fetchProductsForImgs = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products.flatMap((p: { images: string[] }) => p.images[0]);
};

const Carusel = () => {
    const {
        data: images,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["images"],
        queryFn: fetchProductsForImgs,
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Carousel
            withIndicators
            height={200}
            slideSize="33%"
            slidesToScroll={2}
            align="start"
            loop
            initialSlide={currentIndex}
            style={{
                padding: "2%",
                margin: "2.8%",
            }}
        >
            {images.length > 0 &&
                images.map((image: string, index: number) => (
                    <Carousel.Slide key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Carousel.Slide>
                ))}
        </Carousel>
    );
};

export default Carusel;
