import css from "./Style.module.css";

import { Formik, Form, FieldArray, Field } from "formik";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "../../../../../components/ui/Button/ReverseBtn";
import { useProgramsStore } from "../../../../../store/programs";

export default function WorkoutDay({ program, dayData }) {
  if (!program || !dayData) return null;

  const { updateProgram } = useProgramsStore();

  const [hidden, setHidden] = useState([]);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const toggleHidden = (index) => {
    setHidden((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  useEffect(() => {
    if (dayData?.length) {
      setHidden(dayData.map(() => false));
    }
  }, [dayData]);

  const initialValues = {
    name: program.name,
    description: program.description,
    days: dayData.map((day) => ({
      _id: day._id,
      title: day.title,
      exercises: day.exercises.map((ex) => ex),
    })),
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          updateProgram(program._id, values);
        }}
      >
        {({ values, handleChange }) => (
          <Form className={css.workout_wrapper}>
            {/* Заголовок програми */}
            <div className={css.title_wrapper}>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                disabled={!edit}
                className={`${css.program_title} ${edit && css.editable}`}
              />

              {!program.isPublic && (
                <HiMiniPencilSquare
                  className={css.change_svg}
                  onClick={toggleEdit}
                />
              )}
            </div>

            {/* ДНІ */}
            <FieldArray name="days">
              {({ push, remove }) => (
                <>
                  {values.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`${css.col1} ${
                        hidden[dayIndex] ? css.hidden_col : ""
                      }`}
                    >
                      {/* Заголовок дня */}
                      <div className={css.title_wrapper}>
                        <input
                          name={`days.${dayIndex}.title`}
                          value={day.title}
                          onChange={handleChange}
                          disabled={!edit}
                          className={`${css.trening_input} ${css.col1_title} ${
                            edit && css.editable
                          }`}
                        />

                        <IoMdArrowDropdown
                          className={css.change_svg}
                          onClick={() => toggleHidden(dayIndex)}
                        />
                      </div>

                      {/* Вправи */}
                      <FieldArray name={`days.${dayIndex}.exercises`}>
                        {({ push: pushEx, remove: removeEx }) => (
                          <>
                            <ul className={css.plan_list}>
                              {day.exercises.map((exercise, exIndex) => (
                                <li key={exIndex} className={css.plan_item}>
                                  <input
                                    name={`days.${dayIndex}.exercises.${exIndex}`}
                                    value={exercise}
                                    onChange={handleChange}
                                    disabled={!edit}
                                    className={`${css.trening_input} ${
                                      edit && css.editable
                                    }`}
                                  />

                                  {!program.isPublic && edit && (
                                    <button
                                      type="button"
                                      onClick={() => removeEx(exIndex)}
                                      className={css.delete_button}
                                    >
                                      <FaMinus />
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>

                            {!program.isPublic && edit && (
                              <div className={css.action_wrapper}>
                                <button
                                  type="button"
                                  onClick={() => pushEx("Enter your value")}
                                  className={css.add_button}
                                >
                                  <FaPlus /> Add exercise
                                </button>
                                <button
                                  type="button"
                                  onClick={() => remove(dayIndex)}
                                  className={css.add_button}
                                >
                                  <FaMinus /> Delete day
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </FieldArray>
                    </div>
                  ))}

                  {/* Додати день */}
                  {!program.isPublic && edit && (
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          title: `Day`,
                          exercises: [""],
                        })
                      }
                      className={css.add_new_day}
                    >
                      <FaPlus /> Add day
                    </button>
                  )}
                </>
              )}
            </FieldArray>
            {!program.isPublic && edit && (
              <Button
                type="submit"
                className={css.save_button}
                styles={{ maxWidth: "167px" }}
              >
                Save program
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
