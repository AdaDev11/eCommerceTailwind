import axios from "axios";
import { Autoplay as EmblaAutoplay } from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchProductsForImgs = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products.flatMap((p: { images: string[] }) => p.images[0]);
};

const Carusel = () => {
    const [embla, setEmbla] = useState<any>(null);

    // Specify the type explicitly for Autoplay instance
    const autoplay = new EmblaAutoplay({ delay: 2000 });

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
        <Carousel
            withIndicators
            height={200}
            plugins={[autoplay]}
            getEmblaApi={setEmbla}
            onMouseEnter={() => embla?.plugins()?.find(EmblaAutoplay)?.stop()}
            onMouseLeave={() => embla?.plugins()?.find(EmblaAutoplay)?.reset()}
            slidesToScroll={2}
            slideSize="33%"
            align="start"
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
