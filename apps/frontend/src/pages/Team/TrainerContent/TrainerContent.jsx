import css from "./Style.module.css";
import { Link, useParams } from "react-router-dom";
import { useTrainerStore } from "../../../store/trainerStore";
import TrainerSwiper from "../TeamSwiper/TeamSwiper";

import { BsTelephoneForward } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Reviews from "../../../components/Reviews/Reviews";
import EatBrand from "../../../components/EatBrand/EatBrand";

function TrainerContent() {
  const params = useParams();
  const dataTreiners = useTrainerStore((s) => s.trainers);

  const filteredData = Array.isArray(dataTreiners)
    ? dataTreiners.filter(
        (trainer) => trainer.link?.toString() === params.id?.toString()
      )
    : [];

  const uniqueCategories = [
    ...new Set(
      filteredData.flatMap((t) =>
        Array.isArray(t.section) ? t.section : [t.section]
      )
    ),
  ];

  return (
    <>
      <div className="container">
        <div className={css.content_wrapper}>
          <div className={css.swiper_wraper}>
            <TrainerSwiper />
            {filteredData.map(
              (
                { name, greeting, category, about, social, pricePath },
                index
              ) => {
                return (
                  <article key={index} className={css.article_wrapper}>
                    <div className={css.article_header}>
                      <h2>{name}</h2>
                      <h4 className={css.category}>{category}</h4>
                    </div>
                    <div className={css.about}>
                      <p className={css.greeting}>{greeting}</p>
                      <p>{about}</p>
                    </div>
                    {pricePath && (
                      <ul>
                        <h5
                          style={{
                            fontFamily: "var(--font-family-oswald)",
                            color: "var(--accent-color)",
                          }}
                        >
                          Price list
                        </h5>
                        {pricePath?.map(({ label, path }, index) => {
                          return (
                            <li key={index}>
                              <Link to={`/price/${path}`}>
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    color: "var(--accent-color)",
                                  }}
                                >
                                  {label}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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
                      <div aria-label={`Education ${name}`}>
                        <h3 className={css.article_title}>Education</h3>
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
                      <div aria-label={`Experience ${name}`}>
                        <h3 className={css.article_title}>Experience</h3>
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
      </div>
      <Reviews filterType={uniqueCategories} />
      <EatBrand />
    </>
  );
}

export default TrainerContent;
