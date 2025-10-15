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
import Loader from "../ui/Loader/Loader";

export default function Plans() {
  const { data, error, fetchGymPriceList } = gymPriceList();
  const { isLoading, setLoading } = useLoaderStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        await fetchGymPriceList();
        setLoading(false);
      } catch (error) {
        console.error("Помилка при завантаженні прайс-листа:", error);
      }
    };

    loadPrices();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={css.tarife_wrapper}>
      {!isLoading ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
}
