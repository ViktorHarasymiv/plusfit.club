import React from "react";

import style from "./Preference.module.css";
import PreferenceItem from "./PreferenceItem";

const preferenceArray = [
  {
    id: 0,
    icon: "icon-gym",
    title: "Обладнання",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its indus standard dummy layout.",
  },
  {
    id: 1,
    icon: "icon-muscle",
    title: "Тренери",
    ref: "trainer",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its indus standard dummy layout.",
  },
  {
    id: 2,
    icon: "icon-dumbbell",
    title: "Кращі практики",

    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its indus standard dummy layout.",
  },
  {
    id: 3,
    icon: "icon-moneyBag",
    title: "Доступна ціна",
    ref: "tarife",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its indus standard dummy layout.",
  },
];

export default function Preference() {
  return (
    <section id="preferens_section">
      <h1 className="visually-hidden">Preference section</h1>
      <div className="container">
        <div className={style.preferens_wrapper}>
          {preferenceArray.map((data, i) => {
            return <PreferenceItem key={i} data={data} />;
          })}
        </div>
      </div>
    </section>
  );
}
