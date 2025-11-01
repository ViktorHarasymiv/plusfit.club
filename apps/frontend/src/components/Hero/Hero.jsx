import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import style from "./Hero.module.css";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import Slide from "./Slide";
import { Navigation } from "swiper/modules";
import { useHeroStore } from "../../store/heroStore";

export default function Hero() {
  const { fetchHeroSlide, data } = useHeroStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchHeroSlide();
    };

    fetchData();
  }, []);

  return (
    <section className={style.hero_section}>
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
        className="heroSwiper"
      >
        {data.map((slide, i) => {
          return (
            <SwiperSlide key={i}>
              <Slide slide={slide}></Slide>
            </SwiperSlide>
          );
        })}
        <div className="custom-prev">
          <MdOutlineArrowBackIosNew className="swiper_arrow-icon" />
        </div>
        <div className="custom-next">
          <MdOutlineArrowForwardIos className="swiper_arrow-icon" />
        </div>
      </Swiper>
    </section>
  );
}
