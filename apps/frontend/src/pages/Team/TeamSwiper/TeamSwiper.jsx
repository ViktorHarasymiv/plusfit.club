import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import css from "./Style.module.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useTrainerStore } from "../../../store/trainerStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function TrainerSwiper() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataTreiners = useTrainerStore((s) => s.trainers);

  const swiperRef = useRef(null);
  const currentLink = location.pathname.split("/").pop();
  const initialIndex = dataTreiners.findIndex((t) => t.link === currentLink);

  useEffect(() => {
    if (swiperRef.current && initialIndex >= 0) {
      swiperRef.current.slideToLoop(initialIndex, 0);
    }
  }, [initialIndex]);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      modules={[Pagination, Navigation]}
      className={css.mySwiper}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => {
        const index = swiper.realIndex;
        const target = dataTreiners[index];
        if (target?.link && location.pathname !== `/team/${target.link}`) {
          navigate(`/team/${target.link}`);
        }
      }}
    >
      {dataTreiners.map(({ name, photo, category, link }, index) => (
        <SwiperSlide key={index}>
          <div className={css.slide}>
            <img src={photo} alt={link} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
