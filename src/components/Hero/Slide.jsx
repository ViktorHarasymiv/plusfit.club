import React from "react";

import style from "./Hero.module.css";
import { Link } from "react-router-dom";

import Button from "../ui/Button/Button";

export default function Slide({ slide }) {
  return (
    <div
      className="hero_slide"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="container">
        <div className={style.hero_content_wrapper}>
          <div className={style.hero_text_wrapper}>
            <h6 className={style.greeting_text}>
              <span className="accent_text">{slide.greeting}</span>
            </h6>
            <h1 className={style.hero_title}>
              {slide.title.base}
              <br />
              <span className="accent_text">{slide.title.accent}</span>
              {slide.title.baseFinish}
            </h1>
            <p className={style.hero_about}>{slide.about}</p>
          </div>
          <div className={style.hero_action}>
            <Link to={slide.action[0]}>
              <Button>{"Дізнатись більше"}</Button>
            </Link>
            <Link to={slide.action[1]}>
              <Button>{"Записатись"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
