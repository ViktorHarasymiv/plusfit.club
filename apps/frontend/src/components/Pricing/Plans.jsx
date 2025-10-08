import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";

import { motion } from "framer-motion";
import css from "./Pricing.module.css";
import { gymPriceList } from "../../store/gymStore";
import Loader from "../ui/Loader/Loader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";

import "./PricingSwiper.css";

export default function Plans() {
  const { data, loading, error, fetchGymPriceList } = gymPriceList();

  useEffect(() => {
    fetchGymPriceList();
  }, []);

  console.log(data);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.tarife_wrapper}>
      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          className="swiper_card"
        >
          <ul className={css.list}>
            {data.map((item, i) => {
              return (
                <SwiperSlide key={i} className={css.motion}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: i === 0 || i === 2 ? -30 : 30,
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  >
                    <Item data={item} index={i} />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </ul>
        </Swiper>
      </div>
    </div>
  );
}
