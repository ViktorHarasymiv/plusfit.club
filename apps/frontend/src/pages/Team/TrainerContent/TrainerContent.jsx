import React from "react";

import css from "./Style.module.css";
import { useParams } from "react-router-dom";
import { useTrainerStore } from "../../../store/trainerStore";
import TrainerSwiper from "../TeamSwiper/TeamSwiper";

import { SlLocationPin } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { BsTelephoneForward } from "react-icons/bs";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

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
        {filteredData.map(
          ({ name, greeting, category, about, social }, index) => {
            return (
              <article key={index} className={css.article_wrapper}>
                <header>
                  <h2>{name}</h2>
                  <h4 className={css.category}>{category}</h4>
                </header>
                <div className={css.about}>
                  <p className={css.greeting}>{greeting}</p>
                  <p>{about}</p>
                </div>
                <ul className={css.social}>
                  {social.map((item, index) => (
                    <li key={index} className={css.social_item}>
                      {item.instagram && (
                        <a
                          href={item.instagram.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram />
                          <span>{item.instagram.nickname}</span>
                        </a>
                      )}
                      {item.phone && (
                        <a href={`tel:${item.phone}`}>
                          <BsTelephoneForward />
                          <span>{item.phone}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            );
          }
        )}
      </div>
      <div className={css.trainer_wrapper}>
        {filteredData.map(
          ({ name, education, experience, certificate }, index) => {
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
                  <div aria-label={`Досвід ${name}`}>
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
                {certificate && (
                  <div aria-label={`Сертифікат ${name}`}>
                    <h3 className={css.article_title}>Сертифікат</h3>
                    <ul className={css.list}>
                      <li className={css.item}>
                        <strong>Видано:</strong> {certificate.issuedBy}
                      </li>
                      <li className={css.item}>
                        <strong>Програма:</strong> {certificate.program}
                      </li>
                      <li className={css.item}>
                        <strong>Годин:</strong> {certificate.hours}
                      </li>
                      <li className={css.item}>
                        <strong>Формат: </strong>
                        {[
                          certificate.format.lectures && "лекції",
                          certificate.format.practicalLessons && "практика",
                          certificate.format.finalTesting && "тестування",
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </li>
                      <li className={css.item}>
                        <strong>Дисципліни:</strong>
                        <ul>
                          {certificate.disciplines.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>
    </div>
  );
}

export default TrainerContent;
