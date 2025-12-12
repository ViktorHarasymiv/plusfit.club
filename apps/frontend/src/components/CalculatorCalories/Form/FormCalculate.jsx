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
      .typeError("Height must be a number")
      .required("Height is required")
      .min(140, "Height must be at least 140 cm")
      .max(220, "Height must be at most 220 cm")
      .test("is-integer", "Height must be an integer", (value) =>
        Number.isInteger(value)
      ),

    weight: Yup.number()
      .typeError("Weight must be a number")
      .required("Weight is required")
      .min(35, "Weight must be at least 35 kg")
      .max(220, "Weight must be at most 220 kg")
      .test("is-integer", "Weight must be an integer", (value) =>
        Number.isInteger(value)
      ),

    birthday: Yup.date().required("Birthday is required"),

    sex: Yup.string().required("Sex is required"),

    // BMI: Yup.number(),
    // BMR: Yup.number(),
    activityLevel: Yup.string().required("Activity level is required"),
  });

  // CONSTANT

  let age = 0;

  dayjs.locale("eu");

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
                fontSize: "14px",
                color: "var(--body-text-color)  ! important",
                lineHeight: "1.7",
              },
              "& .MuiPickersSectionList-root": {
                alignItems: "center",
                height: "56px",
              },

              "& .MuiPickersOutlinedInput-root": {
                borderRadius: "0px !important",
              },

              "& .MuiPickersOutlinedInput-notchedOutline": {
                borderColor: "var(--border-color)",
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
                  <em>Sex</em>
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
                  <em>Activity</em>
                </MenuItem>
                <MenuItem value={"Sitting"}>Sitting</MenuItem>
                <MenuItem value={"Weak"}>Weak</MenuItem>
                <MenuItem value={"Average"}>Average</MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Strong activity"}>Strong activity</MenuItem>
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
            {"Calculate"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
