import React from "react";

import css from "./Style.module.css";
import { useParams } from "react-router-dom";
import { useTrainerStore } from "../../../store/trainerStore";
import TrainerSwiper from "../TeamSwiper/TeamSwiper";

function TrainerContent() {
  const params = useParams();

  const dataTreiners = useTrainerStore((s) => s.trainers);

  const filteredData = dataTreiners.filter(
    (trainer) => trainer.link === params.id
  );

  return (
    <div>
      <div className={css.swiper_wraper}>
        <TrainerSwiper />
        {filteredData.map(({ name, greeting, category, about }, index) => {
          return (
            <article key={index}>
              <header>
                <h2>{name}</h2>
                <h4 className={css.category}>{category}</h4>
              </header>
              <p className={css.greeting}>{greeting}</p>
              <p>{about}</p>
            </article>
          );
        })}
      </div>
      <div className={css.trainer_wrapper}>
        {filteredData.map(({ name, education, experience }, index) => {
          return (
            <article key={index} className={css.education_article}>
              {education?.length > 0 && (
                <div aria-label={`Освіта ${name}`}>
                  <h3 className={css.article_title}>Освіта</h3>
                  <ul className={css.list}>
                    {education.map((item, i) => (
                      <li key={i} className={css.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {experience?.length > 0 && (
                <div aria-label={`Освіта ${name}`}>
                  <h3 className={css.article_title}>Досвід</h3>
                  <ul className={css.list}>
                    {experience.map((item, i) => (
                      <li key={i} className={css.item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default TrainerContent;
