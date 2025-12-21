import css from "./Style.module.css";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../../../../../components/ui/Button/Button";

export default function WorkoutDay({ dayIndex, dayData, updateDay }) {
  const handleTitleChange = (e) => {
    updateDay(dayIndex, { ...dayData, title: e.target.value });
  };

  const handleExercisesChange = (exerciseIndex, e) => {
    const updatedExercises = [...dayData.exercises];
    updatedExercises[exerciseIndex] = e.target.value;

    updateDay(dayIndex, {
      ...dayData,
      exercises: updatedExercises,
    });
  };

  const toggleEdit = () => {
    updateDay(dayIndex, { ...dayData, editable: !dayData.editable });
  };

  const toggleHidden = () => {
    updateDay(dayIndex, { ...dayData, hidden: !dayData.hidden });
  };

  return (
    <div className={`${css.col1} ${dayData.hidden ? css.hidden_col : ""}`}>
      <div className={css.title_wrapper}>
        <input
          className={`${css.trening_input} ${css.col1_title} ${
            dayData.editable && css.editable
          } `}
          value={dayData.title}
          disabled={!dayData.editable}
          onChange={handleTitleChange}
        />
        <div className={css.action_wrapper}>
          {!dayData.hidden && (
            <HiMiniPencilSquare
              className={css.change_svg}
              onClick={toggleEdit}
            />
          )}
          <IoMdArrowDropdown
            className={css.change_svg}
            onClick={toggleHidden}
          />
        </div>
      </div>

      <ul className={css.plan_list}>
        {dayData.exercises.map((exercise, i) => (
          <li key={i} className={css.plan_item}>
            <input
              className={`${css.trening_input} ${
                dayData.editable && css.editable
              }`}
              disabled={!dayData.editable}
              value={exercise}
              onChange={(e) => handleExercisesChange(i, e)}
            />
          </li>
        ))}
      </ul>
      <Button
        styles={{ maxHeight: "22px", fontSize: "12px", marginLeft: "auto" }}
      >
        Add Exercises
      </Button>
    </div>
  );
}
