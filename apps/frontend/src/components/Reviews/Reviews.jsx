import React, { useEffect } from "react";

import css from "./Reviews.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./reviewSwiper.css";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useReviewStore } from "../../store/reviews";
import SectionTitle from "../SectionTitle/SectionTitle";
import ReviewItem from "./ReviewItem";

import BG from "/img/reviewsbg.jpg";

import { FaRegStar } from "react-icons/fa";

function Reviews() {
  const { reviews, loading, error, fetchReviews, averageRating } =
    useReviewStore();

  useEffect(() => {
    fetchReviews();
  }, []);

  const stylesObj = {
    color: "var(--white)",
  };

  return (
    <section className={css.wrapper} style={{ backgroundImage: `url(${BG})` }}>
      {averageRating}
      <SectionTitle
        title={"Відгуки"}
        about={"Що говорять про нас Наші клієнти"}
        styles={stylesObj}
      />
      <div className="container">
        <Swiper
          loop={true}
          spaceBetween={80}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 80,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
          onSwiper={(swiper) => {
            if (
              swiper.autoplay &&
              typeof swiper.autoplay.start === "function"
            ) {
              swiper.autoplay.start();
            }
          }}
        >
          {reviews.map((content, index) => {
            return (
              <SwiperSlide key={index}>
                <ul className={css.list}>
                  <ReviewItem content={content} />
                </ul>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default Reviews;
