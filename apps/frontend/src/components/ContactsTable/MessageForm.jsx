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
import css from "./Style.module.css";
import TextField from "@mui/material/TextField";

import background from "/img/navBarBg.jpg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { CREATE_MESSAGE } from "../../services/message";

function MessageForm() {
  const width = useWindowWidth();

  const initialValues = {
    name: "",
    email: "",
    section: "",
    message: "",
    phone: "",
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

    message: Yup.string()
      .required("Повідомлення обов'язкове")
      .min(10, "Повідомлення мінімум 10 символів")
      .max(500, "Повідомлення максимум 500 символів"),

    phone: Yup.string()
      .required("Номер телефону обов'язковий")
      .matches(
        /^(\+380|0)\d{9}$/,
        "Невірний формат номера. Приклад: +380XXXXXXXXX або 0XXXXXXXXX"
      ),
  });

  /* SUBMIT */

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await CREATE_MESSAGE(values);
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
    <div className={css.wrapper_form}>
      {width > 1191 && (
        <img
          src={background}
          alt=""
          width={550}
          height={635}
          className={css.image}
        />
      )}
      <div className={css.form_block}>
        <SectionTitle title={"Send message"} about={"Зв'яжіться з нами"} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className={style.form_wrapper}>
              {/* Email */}
              <div
                className={style.input_wrapper}
                style={{ maxWidth: "304px" }}
              >
                <Field
                  name="email"
                  type="text"
                  placeholder="Пошта"
                  className={style.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Phone */}
              <div
                className={style.input_wrapper}
                style={{ maxWidth: "304px" }}
              >
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Номер телефону"
                  className={style.input}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Name */}
              <div
                className={style.input_wrapper}
                style={{ maxWidth: "304px" }}
              >
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
              <div className={style.input_wrapper}>
                <FormControl
                  sx={{
                    m: 1,
                    maxWidth: 304,
                    width: "100%",
                    margin: "0px",
                  }}
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
                    <MenuItem value={"Загальне повідомлення"}>
                      Загальне повідомлення
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

              {/* Textarea */}

              <TextField
                fullWidth
                multiline
                name="message"
                label="Ваше повідомлення"
                rows={4}
                value={values.message}
                onChange={handleChange}
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
                sx={{
                  gridColumn: "span 2",
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
                  maxWidth: "100%",
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
    </div>
  );
}

export default MessageForm;
