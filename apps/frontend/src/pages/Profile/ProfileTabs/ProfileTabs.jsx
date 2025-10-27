import React, { useState } from "react";

import css from "./Style.module.css";
import News from "./Tab/News";
import Recomendation from "./Tab/Recomendation";
import clsx from "clsx";
import MyReviews from "./Tab/MyReviews";
import MyCalculator from "./Tab/MyCalculator";

function ProfileTabs() {
  const [currentTab, setCurrentTab] = useState("Новини");
  const consoleTabs = [
    {
      id: 0,
      label: "Новини",
    },
    {
      id: 1,
      label: "Рекомендації",
    },
    {
      id: 2,
      label: "Коментарі",
    },
    {
      id: 3,
      label: "Калькулятор калорій",
    },
  ];

  console.log(currentTab);

  return (
    <div className={css.console_wrapper}>
      <ul className={css.tab_list}>
        {consoleTabs.map(({ id, label }, index) => (
          <li
            key={index}
            className={clsx(css.tab, label === currentTab && css.active)}
            onClick={() => setCurrentTab(label)}
          >
            {label}
          </li>
        ))}
      </ul>
      <section className={css.tab_section}>
        {currentTab == "Новини" ? (
          <News />
        ) : currentTab == "Рекомендації" ? (
          <Recomendation />
        ) : currentTab == "Коментарі" ? (
          <MyReviews />
        ) : currentTab == "Калькулятор калорій" ? (
          <MyCalculator />
        ) : null}
      </section>
    </div>
  );
}

export default ProfileTabs;
