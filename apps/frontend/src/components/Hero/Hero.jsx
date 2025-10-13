import { Swiper, SwiperSlide } from "swiper/react";

import style from "./Hero.module.css";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Slide from "./Slide";

const sliderArray = [
  {
    id: 0,
    icon: "",
    greeting: "Welcome to plusfit",
    title: {
      base: "Твоя фітнес - історія",
      accent: "починається тут",
      baseFinish: "і вона буде вражаючою",
    },
    about:
      "Ми створили простір, де кожен крок до здорового тіла стає натхненням. Ми не просто тренуємо — ми підтримуємо, надихаємо і допомагаємо тобі розкрити власний потенціал.",
    action: ["/offer/gym", "contacts"],
    video: "/video/file.mp4",
  },
  // {
  //   id: 1,
  //   icon: "",
  //   greeting: "Personal training sessions",
  //   title: {
  //     base: "Тренуйся з тими, хто знає",
  //     accent: "як досягати результату ",
  //     baseFinish: "обери заняття з тренером",
  //   },
  //   about: "Індивідуальний підхід. Максимальна ефективність. Видимий прогрес",
  //   action: ["/price/gym", "info"],
  //   image: "/img/slider/slider-2.jpg",
  // },
  // {
  //   id: 2,
  //   icon: "",
  //   greeting: "DANCE CLASSES FOR KIDS",
  //   title: {
  //     base: "ДАЙТЕ СТАРТ ТВОРЧОМУ РУХУ",
  //     accent: "ТАНЦІ ДЛЯ РОЗВИТКУ І РАДОСТІ",
  //     baseFinish: "Дозволь дитині сяяти",
  //   },

  //   about:
  //     "Ми допоможемо зробити перший крок до великої сцени , запрошуємо до нашої студії",
  //   action: ["/offer/kids", "contacts"],
  //   image: "/img/slider/slider-4.jpg",
  // },
];

export default function Hero() {
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
        {sliderArray.map((slide, i) => {
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
