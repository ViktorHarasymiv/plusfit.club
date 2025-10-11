import { useEffect } from "react";

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

function Reviews({ filterType }) {
  const { reviews, fetchReviews } = useReviewStore();

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className={css.wrapper}>
      <SectionTitle title={"Review"} about={"Відгуки"} />
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
          {reviews
            .filter((review) =>
              filterType?.length
                ? filterType.some((type) => review.section.includes(type))
                : true
            )
            .map((content, index) => {
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
