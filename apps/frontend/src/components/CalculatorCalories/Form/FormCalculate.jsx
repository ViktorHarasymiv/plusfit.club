import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import style from "./FormCalculate.module.css";

import Button from "../../ui/Button/Button";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* UTILS */

import { calculateCalories } from "../../../utils/calculateCalories";

export default function FormCalculate({ setCalories }) {
  const initialValues = {
    height: "",
    weight: "",
    age: "",
    sex: "",
    activityLevel: "",
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

    age: Yup.number()
      .typeError("Вік має бути числом")
      .required("Вік обов’язковий")
      .min(14, "Вік має бути не менше 14 років")
      .max(80, "Вік має бути не більше 80 років"),

    sex: Yup.string().required("Стать обов’язкова"),

    activityLevel: Yup.string().required("Активність обов'язкова"),
  });

  /* SUBMIT */

  const handleSubmit = (values, { resetForm }) => {
    const { height, weight, age, sex, activityLevel } = values;
    setCalories(calculateCalories(sex, weight, height, age, activityLevel));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form className={style.form_wrapper}>
          {/* height */}
          <div className={style.input_wrapper}>
            <Field
              name="height"
              type="text"
              placeholder="Ріст / Cм"
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
              placeholder="Вага / Кг"
              className={style.input}
            />
            <ErrorMessage
              name="weight"
              component="div"
              className={style.error}
            />
          </div>

          {/* age */}
          <div className={style.input_wrapper}>
            <Field
              name="age"
              type="text"
              placeholder="Вік"
              className={style.input}
            />
            <ErrorMessage name="age" component="div" className={style.error} />
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
                <MenuItem value={"male"}>Чоловік</MenuItem>
                <MenuItem value={"female"}>Жінка</MenuItem>
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
                <MenuItem value={"sedentary"}>Сидячий</MenuItem>
                <MenuItem value={"light"}>Слабо</MenuItem>
                <MenuItem value={"moderate"}>Середній</MenuItem>
                <MenuItem value={"active"}>Активний</MenuItem>
                <MenuItem value={"veryActive"}>Сильна активність</MenuItem>
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
