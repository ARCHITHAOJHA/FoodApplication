import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeel } from './topMeel';
import CarouselItem from "./CarouselItem";

const MultiItemCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 2 },
            },
        ],
    };

    return (
        <div>
            <Slider {...settings}>
                {topMeel.map((item) => (
                    <CarouselItem key={item.title} image={item.image} title={item.title} />
                ))}
            </Slider>
        </div>
    );
};

export default MultiItemCarousel;
