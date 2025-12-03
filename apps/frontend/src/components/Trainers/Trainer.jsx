import { motion } from "framer-motion";

import css from "./Trainers.module.css";
import { useTrainerStore } from "../../store/trainerStore";
import TrainerItem from "./TrainerItem";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useLocation } from "react-router-dom";

export default function Trainer({ selectedCategory }) {
  const pathname = useLocation();

  const isHomePage = ["/", "/team", "/about"].includes(pathname.pathname);

  const dataTreiners = useTrainerStore((s) => s.trainers);

  const selectedGroup = selectedCategory || null;

  const filtered = dataTreiners.filter(({ section }) =>
    selectedGroup ? section.includes(selectedGroup) : true
  );

  return (
    <section>
      <div className="container no_padding">
        <div className={css.wrapper}>
          {isHomePage ? (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 50 },
                991: { slidesPerView: 2, spaceBetween: 25 },
                1440: { slidesPerView: 3, spaceBetween: 30 },
              }}
              loop={filtered.length > 3}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="team_swiper"
            >
              {filtered.map(({ name, category, photo, link }, index) => (
                <SwiperSlide key={index}>
                  <TrainerItem
                    name={name}
                    category={category}
                    photo={photo}
                    link={link}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className={css.staticList}>
              {filtered.map(({ name, category, photo, link }, index) => (
                <TrainerItem
                  key={index}
                  name={name}
                  category={category}
                  photo={photo}
                  link={link}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
