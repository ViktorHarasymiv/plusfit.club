import { Formik, Form, FieldArray, ErrorMessage } from "formik";

import Modal from "../../../../../../components/ui/Modal/Modal";

import css from "./Style.module.css";
import ReverseBtn from "../../../../../../components/ui/Button/ReverseBtn";
import Button from "../../../../../../components/ui/Button/Button";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

import { useToastStore } from "../../../../../../store/toastStore";
import { useProgramsStore } from "../../../../../../store/programs";
import { useAuth } from "../../../../../../context/AuthContext";

function CreateProgram({ openModal, setOpenModal }) {
  const { user } = useAuth();
  const { showToast } = useToastStore();
  const { createProgram } = useProgramsStore();

  const initialValues = {
    userId: user._id,
    isPublic: false,
    name: "",
    description: "",
    days: [
      {
        title: "",
        exercises: [""],
      },
    ],
  };

  const style = {
    maxHeight: "70vh",
    minWidth: "35vw",
    minHeight: 0,
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal((prev) => !prev)}
      styles={style}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          createProgram(values);
          showToast(
            <span style={{ display: "flex", alignItems: "center" }}>
              Training successfully changed
            </span>
          );
        }}
      >
        {({ values, handleChange }) => (
          <Form className={css.workout_wrapper}>
            <h2 className={css.form_title}>My new program</h2>

            {/* Title */}
            <div className={css.input_wrapper}>
              <label htmlFor="name">Title</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter title"
                className="input"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>
            {/* Description */}
            <div className={css.input_wrapper}>
              <label htmlFor="description">Description</label>
              <input
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="input"
              />
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>

            {/* Add day and exercises */}
            <FieldArray name="days">
              {({ push, remove }) => (
                <>
                  {values?.days.map((day, dayIndex) => (
                    <div key={dayIndex}>
                      {/* Заголовок дня */}
                      <div className={css.input_wrapper}>
                        <span>Day - {dayIndex + 1}</span>
                        <input
                          name={`days.${dayIndex}.title`}
                          onChange={handleChange}
                          placeholder="Enter day title"
                          className="input"
                        />
                      </div>

                      {/* Вправи */}
                      <FieldArray name={`days.${dayIndex}.exercises`}>
                        {({ push: pushEx, remove: removeEx }) => (
                          <div>
                            <ul className={css.input_wrapper}>
                              {values?.days[dayIndex]?.exercises?.map(
                                (exercise, exIndex) => (
                                  <li key={exIndex} className={css.plan_item}>
                                    <input
                                      name={`days.${dayIndex}.exercises.${exIndex}`}
                                      placeholder="Enter exercise"
                                      onChange={handleChange}
                                      className="input"
                                    />

                                    <button
                                      type="button"
                                      onClick={() => removeEx(exIndex)}
                                      className={css.delete_button}
                                    >
                                      <FaMinus />
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>

                            <div className={css.action_wrapper}>
                              <Button
                                type="button"
                                action={() => pushEx("Enter your value")}
                                className={`${css.add_button} ${css.transparent}`}
                              >
                                Add exercise
                              </Button>
                              <ReverseBtn
                                type="button"
                                action={() => remove(dayIndex)}
                                className={`${css.add_button} ${css.transparent}`}
                              >
                                Delete day
                              </ReverseBtn>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  {/* Додати день */}
                  <ReverseBtn
                    type="button"
                    action={() =>
                      push({
                        title: "",
                        exercises: [""],
                      })
                    }
                    className={`${css.add_new_day} ${css.transparent} ${css.wrapp_to_end}`}
                  >
                    <FaPlus /> Add day
                  </ReverseBtn>
                  <div style={{ alignSelf: "center" }}>
                    <Button
                      type="submit"
                      className={css.save_button}
                      styles={{ maxWidth: "167px" }}
                    >
                      Create
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateProgram;
