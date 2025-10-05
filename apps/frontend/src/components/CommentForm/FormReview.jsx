import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import SectionTitle from "../SectionTitle/SectionTitle";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../ui/Button/Button";

import style from "../CalculatorCalories/Form/FormCalculate.module.css";
import css from "./CommentForm.module.css";
import TextField from "@mui/material/TextField";
import { CREATE_REVIEW } from "../../services/reviews";

export default function FormReview() {
  const initialValues = {
    name: "",
    email: "",
    section: "",
    rating: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Ім'я обов'язкове")
      .min(2, "Ім'я мінімум 2 символи")
      .max(40, "Ім'я максимум 40 символів"),

    email: Yup.string()
      .email("Невірний формат емейлу")
      .required("Емейл обов'язковий")
      .min(6, "Емейл мінімум 6 букв")
      .max(34, "Емейл максимум 34 букви"),

    section: Yup.string().required("Секція обов'язкова"),

    rating: Yup.number()
      .required("Оцінка обов'язкова")
      .min(1, "Оцінка мінімум 1")
      .max(5, "Оцінка максимум 5"),

    message: Yup.string()
      .required("Повідомлення обов'язкове")
      .min(10, "Повідомлення мінімум 10 символів")
      .max(340, "Повідомлення максимум 340 символів"),
  });

  /* SUBMIT */

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await CREATE_REVIEW(values);
      resetForm();
      alert("Відгук успішно додано");
    } catch (error) {
      if (error?.response?.status === 403) {
        alert("Відгук дозволено лише для абонентів.");
      } else {
        const message = error?.message;
        alert(message);
      }

      return;
    }

    resetForm();
  };

  return (
    <div className={css.form_block}>
      <SectionTitle
        title={"Leave a review"}
        about={"Ми завжди раді зворотньому зв'язку"}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form className={style.form_wrapper}>
            {/* Email */}
            <div className={style.input_wrapper} style={{ maxWidth: "304px" }}>
              <Field
                name="email"
                type="text"
                placeholder="Емейл"
                className={style.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={style.error}
              />
            </div>
            {/* Name */}
            <div className={style.input_wrapper} style={{ maxWidth: "304px" }}>
              <Field
                name="name"
                type="text"
                placeholder="Ім'я"
                className={style.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={style.error}
              />
            </div>
            {/* Section */}
            <div className={style.input_wrapper} style={{ maxWidth: "304px" }}>
              <FormControl
                sx={{ m: 1, maxWidth: 304, width: "100%", margin: "0px" }}
              >
                <Select
                  name="section"
                  value={values.section}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    backgroundColor: "transparent",
                    color: "inherit",

                    borderRadius: "0",
                    "& .MuiSelect-icon": {
                      color: "var(--body-text-color)",
                    },
                    "&.Mui-focused .MuiSelect-icon": {
                      color: "var(--accent-color)",
                    },

                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6c757d",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "1px",
                      borderColor: "var(--accent-color)",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Оберіть відділ</em>
                  </MenuItem>
                  <MenuItem value={"Спортивний зал"}>Спортивний зал</MenuItem>
                  <MenuItem value={"Реабілітація та масаж"}>
                    Реабілітація та масаж
                  </MenuItem>
                  <MenuItem value={"Йога"}>Йога</MenuItem>
                  <MenuItem value={"Дитячі танці"}>Дитячі танці</MenuItem>
                  <MenuItem value={"Ендосфера"}>Ендосфера</MenuItem>
                </Select>
              </FormControl>
              <ErrorMessage
                name="section"
                component="div"
                className={style.error}
              />
            </div>

            {/* Rating */}
            <div className={style.input_wrapper} style={{ maxWidth: "304px" }}>
              <FormControl
                sx={{ m: 1, maxWidth: 304, width: "100%", margin: "0px" }}
              >
                <Select
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    backgroundColor: "transparent",
                    color: "inherit",

                    borderRadius: "0",
                    "& .MuiSelect-icon": {
                      color: "var(--body-text-color)",
                    },
                    "&.Mui-focused .MuiSelect-icon": {
                      color: "var(--accent-color)",
                    },

                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6c757d",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "1px",
                      borderColor: "var(--accent-color)",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Ваша оцінка</em>
                  </MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"1"}>1</MenuItem>
                </Select>
              </FormControl>
              <ErrorMessage
                name="rating"
                component="div"
                className={style.error}
              />
            </div>
            {/* Textarea */}

            <TextField
              multiline
              name="message"
              label="Ваш відгук"
              rows={4}
              value={values.message}
              onChange={handleChange}
              error={touched.message && Boolean(errors.message)}
              helperText={touched.message && errors.message}
              sx={{
                maxWidth: "304px",
                backgroundColor: "transparent",

                "& .MuiInputBase-root": {
                  color: "var(--body-text-color)",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6c757d",
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "var(--accent-color)",
                    borderWidth: "1px",
                  },

                "& .MuiFormLabel-root": {
                  color: "#6c757d",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--accent-color)",
                },

                "& .MuiFormHelperText-root": {
                  fontSize: "0.8rem",
                  mt: 0.5,
                },
              }}
            />

            {/* submit */}
            <Button
              type={"submit"}
              styles={{
                maxWidth: "70%",
                maxHeight: "44px",
                justifyContent: "center",
                alignSelf: "end",
              }}
            >
              {"Надіслати"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
