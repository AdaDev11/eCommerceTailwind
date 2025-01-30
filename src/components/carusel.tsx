import { Carousel } from "@mantine/carousel";
import { Button, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../style/carusel.module.css";
import ArticleCardFooter from "./articleCard.tsx";

interface CardProps {
    image: string;
    title: string;
    category: string;
}

const data = [
    {
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best forests to visit in North America",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Hawaii beaches review: better than you think",
        category: "beach",
    },
    {
        image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Mountains at night: 12 best locations to enjoy the view",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Aurora in Norway: when to visit for best experience",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best places to visit this winter",
        category: "tourism",
    },
    {
        image: "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Active volcanos reviews: travel at your own risk",
        category: "nature",
    },
];

function CardsCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <ArticleCardFooter {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            className={classes.carousel}
            slideSize={{ base: "250%", sm: "50%" }}
            slideGap={{ base: 2, sm: "xl" }}
            align="start"
            slidesToScroll={mobile ? 1 : 4}
        >
            {slides}
        </Carousel>
    );
}

export default CardsCarousel;
