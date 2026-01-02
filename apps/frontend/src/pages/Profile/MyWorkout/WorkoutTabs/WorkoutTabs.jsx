import React, { useState } from "react";

import css from "./Style.module.css";
import clsx from "clsx";

import Workout from "./Tab/Workout/Workout";
import Notes from "./Tab/Notes";
import Exercises from "./Tab/Exercises/Exercises";
import MyCalculator from "./Tab/MyCalculator";

function WorkoutTabs() {
  const [currentTab, setCurrentTab] = useState("Workout");

  const consoleTabs = [
    {
      id: 0,
      label: "Workout",
    },
    {
      id: 1,
      label: "Notes",
    },

    {
      id: 2,
      label: "Exercises",
    },
    {
      id: 3,
      label: "Calorie calculator",
    },
  ];

  return (
    <div className={css.console_wrapper}>
      <ul className={css.tab_list}>
        {consoleTabs.map(({ label }, index) => (
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
        {currentTab == "Workout" ? (
          <Workout />
        ) : currentTab == "Notes" ? (
          <Notes />
        ) : currentTab == "Exercises" ? (
          <Exercises />
        ) : currentTab == "Calorie calculator" ? (
          <MyCalculator />
        ) : null}
      </section>
    </div>
  );
}

export default WorkoutTabs;
