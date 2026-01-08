import { useMemo } from "react";

import { useAuth } from "../../context/AuthContext";
import { AvatarPicker } from "../../components/AvatarPicker/AvatarPicker";

import { Field, Formik, Form, useFormikContext, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./Style.module.css";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* MUI DATA */

import dayjs from "dayjs";
import "dayjs/locale/uk";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Button from "../../components/ui/Button/Button";
import ReverseBtn from "../../components/ui/Button/ReverseBtn";

import { useToastStore } from "../../store/toastStore";
import { useLoaderStore } from "../../store/loadingStore";

import { calculateAge } from "../../utils/calculateAge.js";

import Loader from "../../components/ui/Loader/Loader";
import { useAuthStore } from "../../store/authStore.js";

function ProfileSetup() {
  const { isLoading } = useLoaderStore();
  const { deleteAccountFunc } = useAuthStore();
  const { user, fetchUser, patchUser } = useAuth();

  // CONSTANT
  dayjs.locale("eu");

  let age = 0;

  const today = dayjs();

  const minDate = today.subtract(70, "year"); // найстарший допустимий вік
  const maxDate = today.subtract(13, "year"); // наймолодший допустимий вік

  const initialValues = {
    avatar: user.avatar || null,
    name: user.name || "",
    phone: user.phone || "",
    sex: user.sex || "",
    birthday: user.birthday || "",
    goal: user.goal || "",
    section: user.section || "",
    activityLevel: user.activityLevel || "",
    height: user.height || "",
    weight: user.weight || "",
  };

  const userPatchSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(30, "Name cannot exceed 30 characters")
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Name must contain both first and last name separated by a space"
      )
      .optional(), // better optional for PATCH

    phone: Yup.string().matches(
      /^\+380\d{9}$/,
      "Enter phone number in format +380XXXXXXXXX"
    ),

    sex: Yup.string().oneOf(["Man", "Woman"]).optional(),

    birthday: Yup.date()
      .min(minDate, "Date of birth is too old")
      .max(maxDate, "You must be at least 13 years old")
      .optional(),

    goal: Yup.string()
      .oneOf([
        "Emaciation",
        "Maintain weight",
        "Slow weight gain",
        "Active weight gain",
        "Gaining lean muscle mass",
      ])
      .optional(),

    section: Yup.string()
      .oneOf(["Gym", "Fitness", "Massage", "Rehabilitation", "Yoga"])
      .optional(),

    height: Yup.number()
      .nullable()
      .typeError("Height must be a number")
      .min(140, "Height must be at least 140 cm")
      .max(220, "Height must be at most 220 cm")
      .test(
        "is-integer",
        "Height must be an integer",
        (value) => value == null || Number.isInteger(value)
      ),

    weight: Yup.number()
      .nullable()
      .typeError("Weight must be a number")
      .min(35, "Weight must be at least 35 kg")
      .max(220, "Weight must be at most 220 kg")
      .test(
        "is-integer",
        "Weight must be an integer",
        (value) => value == null || Number.isInteger(value)
      ),

    activityLevel: Yup.string()
      .oneOf(["Sitting", "Weak", "Average", "Active", "Strong activity"])
      .optional(),
  });

  // DATA UTILS

  const formattedBirthday = dayjs(initialValues.birthday).format("D MMMM YYYY");

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
                lineHeight: "1",
                color: "var(--dark) !important",
              },

              "& .MuiPickersOutlinedInput-notchedOutline": {
                borderColor: "var(--dark)",
              },
              "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "var(--accent-color) !important",
              },

              "& .MuiPickersSectionList-root": {
                padding: "10px 0",

                borderColor: "var(--accent-color)",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "transparent",
                },
            },
          },
        }}
      />
    );
  };

  const handlerSubmit = async (values) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      }

      const res = await patchUser(formData);

      await fetchUser();

      if (res) {
        useToastStore
          .getState()
          .showToast("Дані успішно змінено" || res.data.message, "success");
        return res;
      }
    } catch (error) {
      useToastStore.getState().showToast(error.message);
      console.log("error", error.messages);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.setup_wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={userPatchSchema}
        onSubmit={handlerSubmit}
      >
        {({ values, handleChange, errors, touched, resetForm }) => (
          <Form className={css.form_wrapper}>
            <div className={css.coll_1}>
              <div className={css.user_info_input}>
                {/* Name */}

                <div className="input_wrapper">
                  <label htmlFor="name" className={css.setup_label}>
                    Enter your full name
                    <Field
                      name="name"
                      type="text"
                      placeholder=""
                      className="input"
                      autoFocus={false}
                      style={{
                        color:
                          errors.name && touched.name
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                        borderColor:
                          errors.name && touched.name
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                      }}
                    />
                  </label>
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                {/* Birthday */}

                <div className="input_wrapper">
                  <div>
                    <label htmlFor="birthday" className={css.setup_label}>
                      Your birthday
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormikDatePickerBirthday />
                    </LocalizationProvider>
                  </div>

                  <ErrorMessage
                    name="birthday"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Sex */}

                <div className="input_wrapper">
                  <label htmlFor="sex" className={css.setup_label}>
                    Choose your gender
                    <FormControl sx={{ m: 2, width: "100%", margin: "0px" }}>
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
                          fontSize: "14px",
                          height: "44px",

                          backgroundColor: "transparent",
                          color: "var(--dark)",

                          "& .MuiOutlinedInput-input": {
                            padding: "12px 18px",
                          },

                          borderRadius: "0",
                          "& .MuiSelect-icon": {
                            color: "var(--dark)",
                          },
                          "&.Mui-focused .MuiSelect-icon": {
                            color: "var(--accent-color)",
                          },

                          ".MuiOutlinedInput-notchedOutline": {
                            borderRadius: "6px",
                            borderColor: "var(--dark)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderColor: "var(--accent-color)",
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Choose your gender</em>
                        </MenuItem>
                        <MenuItem value={"Man"}>Man</MenuItem>
                        <MenuItem value={"Woman"}>Woman</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <ErrorMessage name="sex" component="div" className="error" />
                </div>

                {/* Telephone */}

                <div className="input_wrapper">
                  <label htmlFor="phone" className={css.setup_label}>
                    Enter your phone number
                    <Field
                      name="phone"
                      type="text"
                      placeholder="+380XXXXXXXXX"
                      className="input placeholder"
                      autoFocus={false}
                      style={{
                        color:
                          errors.phone && touched.phone
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                        borderColor:
                          errors.phone && touched.phone
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                      }}
                    />
                  </label>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Section */}

                <div className="input_wrapper">
                  <label htmlFor="section" className={css.setup_label}>
                    Mark your section
                    <FormControl sx={{ m: 1, width: "100%", margin: "0px" }}>
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
                          fontSize: "14px",
                          height: "44px",

                          backgroundColor: "transparent",
                          color: "var(--dark)",

                          "& .MuiOutlinedInput-input": {
                            padding: "12px 18px",
                          },

                          borderRadius: "0",
                          "& .MuiSelect-icon": {
                            color: "var(--dark)",
                          },
                          "&.Mui-focused .MuiSelect-icon": {
                            color: "var(--accent-color)",
                          },

                          ".MuiOutlinedInput-notchedOutline": {
                            borderRadius: "6px",
                            borderColor: "var(--dark)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderColor: "var(--accent-color)",
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Check a department</em>
                        </MenuItem>
                        <MenuItem value={"Gym"}>Gym</MenuItem>
                        <MenuItem value={"Fitness"}>Fitness</MenuItem>
                        <MenuItem value={"Massage"}>Massage</MenuItem>
                        <MenuItem value={"Rehabilitation"}>
                          Rehabilitation
                        </MenuItem>
                        <MenuItem value={"Yoga"}>Yoga</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <ErrorMessage
                    name="section"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className={css.user_info_input}>
                {/* Height */}

                <div className="input_wrapper">
                  <label htmlFor="height" className={css.setup_label}>
                    Enter your height
                    <Field
                      name="height"
                      type="number"
                      placeholder="Height / sm"
                      className="input placeholder"
                      autoFocus={false}
                      style={{
                        color:
                          errors.height && touched.height
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                        borderColor:
                          errors.height && touched.height
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                      }}
                    />
                  </label>
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Weight */}

                <div className="input_wrapper">
                  <label htmlFor="weight" className={css.setup_label}>
                    Enter your weight
                    <Field
                      name="weight"
                      type="number"
                      placeholder="Weight / kg"
                      className="input placeholder"
                      autoFocus={false}
                      style={{
                        color:
                          errors.weight && touched.weight
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                        borderColor:
                          errors.weight && touched.weight
                            ? "var(--pastel-red)"
                            : "var(--dark)",
                      }}
                    />
                  </label>
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Goal */}

                <div className="input_wrapper">
                  <label htmlFor="goal" className={css.setup_label}>
                    Mark your goal
                    <FormControl sx={{ m: 1, width: "100%", margin: "0px" }}>
                      <Select
                        name="goal"
                        value={values.goal}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        sx={{
                          fontSize: "14px",
                          height: "44px",

                          backgroundColor: "transparent",
                          color: "var(--dark)",

                          "& .MuiOutlinedInput-input": {
                            padding: "12px 18px",
                          },

                          borderRadius: "0",
                          "& .MuiSelect-icon": {
                            color: "var(--dark)",
                          },
                          "&.Mui-focused .MuiSelect-icon": {
                            color: "var(--accent-color)",
                          },

                          ".MuiOutlinedInput-notchedOutline": {
                            borderRadius: "6px",
                            borderColor: "var(--dark)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderColor: "var(--accent-color)",
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Choose a goal</em>
                        </MenuItem>
                        <MenuItem value={"Emaciation"}>Emaciation</MenuItem>
                        <MenuItem value={"Maintain weight"}>
                          Maintain weight
                        </MenuItem>
                        <MenuItem value={"Slow weight gain"}>
                          Slow weight gain
                        </MenuItem>
                        <MenuItem value={"Active weight gain"}>
                          Active weight gain
                        </MenuItem>
                        <MenuItem value={"Gaining lean muscle mass"}>
                          Gaining lean muscle mass
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <ErrorMessage
                    name="section"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Activity */}

                <div className="input_wrapper">
                  <label htmlFor="activityLevel" className={css.setup_label}>
                    Choose your activity level
                    <FormControl sx={{ m: 1, width: "100%", margin: "0px" }}>
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
                          fontSize: "14px",
                          height: "44px",

                          backgroundColor: "transparent",
                          color: "var(--dark)",

                          "& .MuiOutlinedInput-input": {
                            padding: "12px 18px",
                          },

                          borderRadius: "0",
                          "& .MuiSelect-icon": {
                            color: "var(--dark)",
                          },
                          "&.Mui-focused .MuiSelect-icon": {
                            color: "var(--accent-color)",
                          },

                          ".MuiOutlinedInput-notchedOutline": {
                            borderRadius: "6px",
                            borderColor: "var(--dark)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderColor: "var(--accent-color)",
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Активність</em>
                        </MenuItem>
                        <MenuItem value={"Sitting"}>Sitting</MenuItem>
                        <MenuItem value={"Weak"}>Weak</MenuItem>
                        <MenuItem value={"Average"}>Average</MenuItem>
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Strong activity"}>
                          Strong activity
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <ErrorMessage
                    name="activityLevel"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              {/* Avatar */}

              <div className="input_wrapper">
                <AvatarPicker name={"avatar"} />
              </div>
            </div>
            <div className="action_wrapper">
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  type="submit"
                  styles={{ maxWidth: "226px", marginTop: "auto" }}
                >
                  Save
                </Button>
                <ReverseBtn
                  type="button"
                  styles={{ maxWidth: "226px", marginTop: "auto" }}
                  action={resetForm}
                >
                  Clear
                </ReverseBtn>
              </div>
              <Button type={"button"} action={deleteAccountFunc}>
                Delete account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileSetup;
