import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const Carousel = () => {
  useEffect(() => {
    new Swiper(".swiper-container", {
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 1,
    });
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
      </div>
    </div>
  );
};

export default Carousel;
