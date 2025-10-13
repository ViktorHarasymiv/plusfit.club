import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";

import css from "./Pricing.module.css";
import { gymPriceList } from "../../store/gymStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";

import "./PricingSwiper.css";
import { useLoaderStore } from "../../store/loadingStore";

export default function Plans() {
  const { data, loading, error, fetchGymPriceList } = gymPriceList();
  const [activeIndex, setActiveIndex] = useState(0);

  const { setLoading } = useLoaderStore();

  useEffect(() => {
    fetchGymPriceList();
    setLoading(loading);
  }, []);

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
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="swiper_card"
        >
          <ul className={css.list}>
            {data.map((item, i) => {
              return (
                <SwiperSlide key={i} className={css.motion}>
                  <Item data={item} i={i} />
                </SwiperSlide>
              );
            })}
          </ul>
        </Swiper>
      </div>
    </div>
  );
}
