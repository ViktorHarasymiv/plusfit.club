import { motion } from "framer-motion";

import style from "./Hero.module.css";
import { Link } from "react-router-dom";

import Button from "../ui/Button/Button";
import ReverseBtn from "../ui/Button/ReverseBtn";

import { FcSportsMode } from "react-icons/fc";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

export default function Slide({ slide }) {
  return (
    <div
      className="hero_slide"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="container">
        <div className={style.hero_content_wrapper}>
          {slide.video ? <VideoPlayer file={slide.video} /> : null}
          <div className={style.hero_text_wrapper}>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.4, delay: 0, ease: "easeOut" }}
            >
              <div className={style.greeting_wrapper}>
                <FcSportsMode />
                <h6 className={style.greeting_text}>
                  <span className="accent_text">{slide.greeting}</span>
                </h6>
              </div>
            </motion.div>

            <h1 className={style.hero_title}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              >
                {slide.title.base}
                <span className="accent_text">{slide.title.accent}</span>
                {slide.title.baseFinish}
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <p className={style.hero_about}>{slide.about}</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <div className={style.hero_action}>
              <Link to={slide.action[0]}>
                <Button>{"Дізнатись більше"}</Button>
              </Link>
              <Link to={slide.action[1]}>
                <ReverseBtn>{"Записатись"}</ReverseBtn>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
