import React, { useEffect, useState } from "react";
import { useExercisesStore } from "../../../../../../store/exercises.store";

import css from "./Style.module.css";

function GroupList({ current }) {
  const { filters, getFilters, getExercises } = useExercisesStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      await getFilters(current, page, limit);
    };
    fetchData();
  }, [current, page, limit]);

  const getExercisesFilter = (path, name) => {
    getExercises({ [path.toLowerCase()]: name });
  };

  return (
    <ul className={css.list_wrapper}>
      {filters.map(({ name, filter, imgUrl }, i) => (
        <li
          key={i}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className={css.list_item}
          onClick={() => getExercisesFilter(current, name)}
        >
          <h2>{name}</h2>
          <p>{filter}</p>
        </li>
      ))}
    </ul>
  );
}

export default GroupList;
