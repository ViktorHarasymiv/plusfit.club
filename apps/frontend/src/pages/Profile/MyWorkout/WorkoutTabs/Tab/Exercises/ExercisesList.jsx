import { useState } from "react";
import ExercisesModal from "./ExercisesModal";

import css from "./Style.module.css";
import { FaStar } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";

import { FaPersonRunning } from "react-icons/fa6";

function ExercisesExercises({ exercises }) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const hundleAction = (id_item) => {
    setId(id_item);
    setIsOpen((prev) => !prev);
  };

  console.log(exercises);

  return (
    <>
      <ul className={css.exercises_list}>
        {exercises.map(
          ({ _id, name, target, bodyPart, burnedCalories, rating, time }) => (
            <li key={_id} onClick={() => hundleAction(_id)}>
              <aside className={css.aside_tile}>
                <div className={css.top_wrapper}>
                  <div className={css.top_col1}>
                    <div className={css.target_tile}>{target}</div>
                    <div className={css.rating_tile}>
                      <span>{rating}</span>
                      <FaStar className={css.icon} />
                    </div>
                  </div>
                  <div>
                    <button type="button">
                      Start <GoArrowRight className={css.icon} />
                    </button>
                  </div>
                </div>
                <div className={css.middle_wrapper}>
                  <div className={css.top_col1}>
                    <div className={css.icon_tile}>
                      <FaPersonRunning />
                    </div>
                    <span className={css.name}>{name}</span>
                  </div>
                </div>
                <div className={css.buttom_wrapper}>
                  <div>
                    <span>Burned calories:</span>{" "}
                    <span>
                      {burnedCalories}/{time} min
                    </span>
                  </div>
                  <div>
                    <span>Body part:</span> <span>{bodyPart}</span>
                  </div>
                </div>
              </aside>
            </li>
          )
        )}
      </ul>
      <ExercisesModal id={id} isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
}

export default ExercisesExercises;
