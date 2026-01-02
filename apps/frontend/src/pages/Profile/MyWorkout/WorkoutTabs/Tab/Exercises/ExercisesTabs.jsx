import clsx from "clsx";

import css from "./Style.module.css";
import { useExercisesStore } from "../../../../../../store/exercises.store";
import { useEffect } from "react";

function ExercisesTabs({ setTab, tab }) {
  const { getCleanExercises } = useExercisesStore();
  const tabs = ["Muscles", "Body parts", "Equipment"];

  useEffect(() => {
    getCleanExercises();
  }, [tab]);

  return (
    <ul className={css.tab_list}>
      {tabs.map((item, i) => (
        <li
          onClick={() => setTab(item)}
          key={i}
          className={clsx(css.tab, tab === item && css.active)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ExercisesTabs;
