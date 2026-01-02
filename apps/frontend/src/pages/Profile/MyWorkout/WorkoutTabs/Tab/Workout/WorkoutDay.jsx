import { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import Switch from "@mui/material/Switch";

import css from "./Style.module.css";

import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

import Button from "../../../../../../components/ui/Button/ReverseBtn";

import { useProgramsStore } from "../../../../../../store/programs";
import { useToastStore } from "../../../../../../store/toastStore";

export default function WorkoutDay({
  program,
  dayData,
  toggleEdit,
  setEdit,
  edit,
}) {
  if (!program || !dayData) return null;

  const [hidden, setHidden] = useState([]);

  const { showToast } = useToastStore();
  const { updateProgram } = useProgramsStore();

  useEffect(() => {
    if (dayData?.length) {
      setHidden(dayData.map(() => false));
    }
  }, [dayData]);

  const toggleHidden = (index) => {
    setHidden((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const initialValues = {
    name: program.name,
    description: program.description,
    days: dayData.map((day) => ({
      _id: day._id,
      title: day.title,
      exercises: day.exercises.map((ex) => ex),
    })),
  };

  const label = { inputProps: { "aria-label": "Edit mode switch" } };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          updateProgram(program._id, values);
          setEdit(false);
          showToast(
            <span style={{ display: "flex", alignItems: "center" }}>
              Training successfully changed
            </span>
          );
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
                <Switch
                  onClick={toggleEdit}
                  {...label}
                  checked={edit}
                  color="warning"
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
