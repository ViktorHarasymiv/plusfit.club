import React from "react";

import css from "./Content.module.css";

import { MdDone } from "react-icons/md";
import Trainer from "../../../components/Trainers/Trainer";

export default function Content({ content }) {
  return (
    <div className={css.page_content}>
      <img
        src={content.frontImage}
        alt="Front image for page with text"
        className={css.front_image}
        width="100%"
        height="400px"
      />
      {/* First content block */}
      <div>
        <h3 className={css.group_title}>{content.firstParagraph.firstTitle}</h3>
        <br />
        <p>{content.firstParagraph.first}</p>
        <br />
        <br />
        <p>{content.firstParagraph.secound}</p>
        <div className={css.content_image_wrapper}>
          {content.firstParagraph.contentImage.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                alt=""
                className={css.content_image}
              />
            );
          })}
        </div>
        <p>{content.firstParagraph.third}</p>
      </div>

      {/* Secound content block */}
      <h3 className={css.group_title}>{content.secoundParagraph.firstTitle}</h3>
      <br />
      <p>{content.secoundParagraph.first}</p>

      {content.secoundParagraph.article && (
        <ul className={css.article_list}>
          {content.secoundParagraph.article.map((item, index) => {
            return (
              <li key={index} className={css.article_item}>
                <MdDone className="heart_ico " />
                {item}
              </li>
            );
          })}
        </ul>
      )}

      {/* Trainer block */}
      <h2 className={css.trainers_title}>
        Наша <span className="active">команда</span>
      </h2>
      <div className={css.trainer_block}>
        <Trainer />
      </div>
    </div>
  );
}
