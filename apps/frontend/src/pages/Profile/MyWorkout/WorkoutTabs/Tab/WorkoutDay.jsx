import css from "./Style.module.css";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

export default function WorkoutDay({ program, dayData }) {
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

  console.log(dayData);

  return (
    <>
      <h1>{program.name}</h1>

      {dayData?.map((item, index) => {
        return (
          <div className={`${css.col1} ${item?.hidden ? css.hidden_col : ""}`}>
            <div key={index} className={css.title_wrapper}>
              <input
                className={`${css.trening_input} ${css.col1_title} ${
                  program?.editable && css.editable
                } `}
                value={item.title}
                disabled={!dayData?.editable}
                onChange={handleTitleChange}
              />
              <div className={css.action_wrapper}>
                {program.hidden ||
                  (!program.isPublic && (
                    <HiMiniPencilSquare
                      className={css.change_svg}
                      onClick={toggleEdit}
                    />
                  ))}
                <IoMdArrowDropdown
                  className={css.change_svg}
                  onClick={toggleHidden}
                />
              </div>
            </div>

            <ul className={css.plan_list}>
              {item?.exercises.map((exercise, i) => (
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
            {!program.isPublic && (
              <div className={css.action_wrapper}>
                <button
                  type="button"
                  className={`${css.add_button} ${css.change_plase}`}
                >
                  <FaPlus />
                  Push
                </button>
                <button type="button" className={css.add_button}>
                  <FaMinus />
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
