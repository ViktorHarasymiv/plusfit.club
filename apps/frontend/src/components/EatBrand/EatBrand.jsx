import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import css from "./Style.module.css";

// import required modules
import { Autoplay } from "swiper/modules";

function EatBrand({ filterArgs }) {
  const eatArray = [
    {
      id: 1,
      name: "WHEY Protein 5kg Banana",
      media: ["/img/eat/8.avif"],
      about: "",
      price: 599,
    },
    {
      id: 2,
      name: "Optimum Nutrition, Opti-Men, мультивітаміни для чоловіків, 90 таблеток",
      media: ["/img/eat/40.avif"],
      about: "",
      tags: [
        "чоловік",
        "чоловічі вітаміни",
        "Спортивний зал",
        "Фітнес тренування ",
      ],
      price: 599,
    },
    {
      id: 3,
      name: "WHEY Protein 5kg Banana",
      media: ["/img/eat/48.avif"],
      about: "",
      price: 599,
    },
    {
      id: 4,
      name: "WHEY Protein 5kg Banana",
      media: ["/img/eat/53.avif"],
      about: "",
      price: 599,
    },
    {
      id: 5,
      name: "WHEY Protein 5kg Banana",
      media: ["/img/eat/100.avif"],
      about: "",
      price: 599,
    },
    {
      id: 6,
      name: "Optimum Nutrition, Opti-Men, мультивітаміни для чоловіків, 90 таблеток",
      media: ["/img/eat/eu_banana.png"],
      about: "",
      price: 599,
    },
    {
      id: 7,
      name: "WHEY Protein 5kg Banana",
      media: ["/img/eat/nutrition-bcca.webp"],
      about: "",
      price: 599,
    },
  ];

  const filteredItems = filterArgs
    ? eatArray.filter(
        (item) => Array.isArray(item.tags) && item.tags.includes(filterArgs)
      )
    : eatArray;

  const canLoop = filteredItems.length > 6;

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={100}
        loop={canLoop}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className={css.eat_swiper}
      >
        {filteredItems.map(({ name, media }, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={media[0]}
                alt={name}
                width={200}
                height={250}
                className={css.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default EatBrand;
