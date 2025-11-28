import { useMemo } from "react";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

import style from "./FormCalculate.module.css";

import Button from "../../ui/Button/Button";

/* MUI DATA */

import dayjs from "dayjs";
import "dayjs/locale/uk";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* UTILS */

import { useAuth } from "../../../context/AuthContext";

import { calculateCalories } from "../../../utils/calculateCalories";
import { calculateAge } from "../../../utils/calculateAge";

export default function FormCalculate({ setCalories }) {
  const { user, patchUser } = useAuth();

  const initialValues = {
    height: user?.height || "",
    weight: user?.weight || "",
    sex: user?.sex || "",
    birthday: user?.birthday || "",
    activityLevel: user?.activityLevel || "",
    BMI: user?.BMI || "",
    BMR: user?.BMR || "",
  };

  const validationSchema = Yup.object({
    height: Yup.number()
      .typeError("Ріст має бути числом")
      .required("Ріст обов'язковий")
      .min(140, "Ріст має бути не менше 140 см")
      .max(220, "Ріст має бути не більше 220 см")
      .test("is-integer", "Ріст має бути цілим числом", (value) =>
        Number.isInteger(value)
      ),

    weight: Yup.number()
      .typeError("Вага має бути числом")
      .required("Вага обов’язкова")
      .min(35, "Вага має бути не менше 35 кг")
      .max(220, "Вага має бути не більше 220 кг")
      .test("is-integer", "Вага має бути цілим числом", (value) =>
        Number.isInteger(value)
      ),

    birthday: Yup.date().required("Вік обов’язковий"),

    sex: Yup.string().required("Стать обов’язкова"),

    // BMI: Yup.number(),
    // BMR: Yup.number(),
    activityLevel: Yup.string().required("Активність обов'язкова"),
  });

  // CONSTANT

  let age = 0;

  dayjs.locale("uk");

  const formattedBirthday = dayjs(initialValues.birthday).format("D MMMM YYYY");

  const today = dayjs();

  const minDate = today.subtract(70, "year"); // найстарший допустимий вік
  const maxDate = today.subtract(13, "year"); // наймолодший допустимий вік

  // DATA UTILS

  const FormikDatePickerBirthday = () => {
    const { values, setFieldValue } = useFormikContext();

    age = useMemo(() => {
      if (!values.birthday) return null;
      return calculateAge(values.birthday);
    }, [values.birthday]);

    const handleChange = (newValue) => {
      if (newValue && newValue.isValid()) {
        const iso = newValue.toISOString();
        setFieldValue("birthday", iso);
      }
    };

    return (
      <DesktopDatePicker
        label={formattedBirthday}
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
        slotProps={{
          textField: {
            sx: {
              width: "100%",
              borderColor: "transparent",
              "& .MuiInputLabel-root": {
                textAlign: "center",
                alignItems: "center",

                fontSize: "14px",
                lineHeight: "1",
                color: "var(--dark)",
              },
              "& .MuiPickersSectionList-root": {
                height: "56px",
              },

              "& .MuiPickersOutlinedInput-root": {
                borderRadius: "0px !important",
              },

              "& .MuiPickersOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0, 0.6)",
              },
              "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "var(--accent-color) !important",
              },
            },
          },
        }}
      />
    );
  };

  /* SUBMIT */

  const handleSubmit = async (values, { resetForm }) => {
    const { height, weight, sex, activityLevel } = values;

    setCalories(calculateCalories(sex, weight, height, age, activityLevel));

    const result = calculateCalories(sex, weight, height, age, activityLevel);

    values.BMI = result?.BMI || 0;
    values.BMR = result?.BMR || 0;

    console.log(values);

    await patchUser(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form className={style.form_wrapper}>
          {/* height */}
          <div className={style.input_wrapper}>
            <Field
              name="height"
              type="text"
              placeholder="Height"
              className={style.input}
            />
            <ErrorMessage
              name="height"
              component="div"
              className={style.error}
            />
          </div>

          {/* weight */}
          <div className={style.input_wrapper}>
            <Field
              name="weight"
              type="text"
              placeholder="Weight"
              className={style.input}
            />
            <ErrorMessage
              name="weight"
              component="div"
              className={style.error}
            />
          </div>

          {/* Birthday */}

          <div className={style.input_wrapper}>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormikDatePickerBirthday />
              </LocalizationProvider>
            </div>

            <ErrorMessage name="birthday" component="div" className="error" />
          </div>

          {/* Sex */}
          <div className={style.input_wrapper}>
            <FormControl
              sx={{ m: 1, maxWidth: 276, width: "100%", margin: "0px" }}
            >
              <Select
                name="sex"
                value={values.sex}
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
                <MenuItem value="">
                  <em>Стать</em>
                </MenuItem>
                <MenuItem value={"Man"}>Man</MenuItem>
                <MenuItem value={"Woman"}>Woman</MenuItem>
              </Select>
            </FormControl>
            <ErrorMessage name="sex" component="div" className={style.error} />
          </div>

          {/* activity */}
          <div className={style.input_wrapper}>
            <FormControl
              sx={{ m: 1, maxWidth: 276, width: "100%", margin: "0px" }}
            >
              <Select
                name="activityLevel"
                value={values.activityLevel}
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
                <MenuItem value="">
                  <em>Активність</em>
                </MenuItem>
                <MenuItem value={"Сидячий"}>Сидячий</MenuItem>
                <MenuItem value={"Слабо"}>Слабо</MenuItem>
                <MenuItem value={"Середній"}>Середній</MenuItem>
                <MenuItem value={"Активний"}>Активний</MenuItem>
                <MenuItem value={"Сильна активність"}>
                  Сильна активність
                </MenuItem>
              </Select>
            </FormControl>
            <ErrorMessage
              name="activityLevel"
              component="div"
              className={style.error}
            />
          </div>

          {/* submit */}
          <Button type={"submit"} styles={{ maxWidth: "160px" }}>
            {"Розрахувати"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
