import React from "react";

import style from "./Preference.module.css";
import PreferenceItem from "./PreferenceItem";

const preferenceArray = [
  {
    id: 0,
    icon: "icon-gym",
    title: "Обладнання",
    about:
      "У нашому залі встановлено 38 сучасних тренажерів, які дозволяють комфортно та ефективно тренуватися людям із різним рівнем підготовки – від початківців до професіоналів.",
  },
  {
    id: 1,
    icon: "icon-muscle",
    title: "Тренери",
    ref: "trainer",
    about:
      "Серце будь-якого тренажерного залу – це не лише обладнання, а й люди, які допомагають досягати результату. У нашій команді працюють два професійні тренери – Іван та Еліна.",
  },
  {
    id: 2,
    icon: "icon-dumbbell",
    title: "Кращі практики",

    about:
      "Ми створили простір, де кожен може обрати свій шлях – чи це класичні силові тренування, чи практика для тіла й душі, чи перші кроки дитини у спорті.",
  },
  {
    id: 3,
    icon: "icon-moneyBag",
    title: "Доступна ціна",
    ref: "tarife",
    about:
      "Ми віримо, що спорт має бути доступним для кожного. Саме тому в нашому залі сформована прозора та гнучка система оплат, щоб ви могли обирати варіант, який максимально відповідає вашим цілям, можливостям та стилю життя.",
  },
];

export default function Preference() {
  return (
    <section id="preferens_section">
      <h1 className="visually-hidden">Preference section</h1>
      <div className="container">
        <div className={style.preferens_wrapper}>
          {preferenceArray.map((data, i) => {
            return <PreferenceItem key={i} index={i} data={data} />;
          })}
        </div>
      </div>
    </section>
  );
}
