import React from "react";

import style from "./Hero.module.css";
import { Link } from "react-router-dom";

import Button from "../ui/Button/Button";
import ReverseBtn from "../ui/Button/ReverseBtn";

import { CgGym } from "react-icons/cg";

export default function Slide({ slide }) {
  return (
    <div
      className="hero_slide"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="container">
        <div className={style.hero_content_wrapper}>
          <div className={style.hero_text_wrapper}>
            <div className={style.greeting_wrapper}>
              <CgGym />
              <h6 className={style.greeting_text}>
                <span className="accent_text">{slide.greeting}</span>
              </h6>
            </div>
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
              <ReverseBtn>{"Записатись"}</ReverseBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
