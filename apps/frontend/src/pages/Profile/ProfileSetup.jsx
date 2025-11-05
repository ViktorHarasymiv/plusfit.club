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

function ProfileSetup() {
  const { isLoading } = useLoaderStore();
  const { user, fetchUser, patchUser } = useAuth();

  // CONSTANT
  dayjs.locale("uk");

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
      .min(3, "Ім’я має містити щонайменше 3 символи")
      .max(30, "Ім’я не може перевищувати 30 символів")
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Ім’я має містити прізвище та ім’я через пробіл"
      )
      .required("Ім’я обов’язкове"),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Введіть номер у форматі +380XXXXXXXXX")
      .required("Номер телефону обов'язковий"),
    sex: Yup.string(),
    birthday: Yup.date()
      .min(minDate, "Вік не може перевищувати 80 років")
      .max(maxDate, "Вам має бути щонайменше 13 років"),
    goal: Yup.string().oneOf[
      ("Схуднення",
      "Утримати вагу",
      "Повільний набір маси",
      "Активний набір маси",
      "Набір сухої мязової маси")
    ],
    section:
      Yup.string().oneOf[
        ("Спортивний зал",
        "Реабілітація та масаж",
        "Йога",
        "Дитячі танці",
        "Ендосфера")
      ],
    height: Yup.number()
      .typeError("Ріст має бути числом")
      .min(140, "Ріст має бути не менше 140 см")
      .max(220, "Ріст має бути не більше 220 см")
      .test("is-integer", "Ріст має бути цілим числом", (value) =>
        Number.isInteger(value)
      ),

    weight: Yup.number()
      .typeError("Вага має бути числом")
      .min(35, "Вага має бути не менше 35 кг")
      .max(220, "Вага має бути не більше 220 кг")
      .test("is-integer", "Вага має бути цілим числом", (value) =>
        Number.isInteger(value)
      ),
    activityLevel:
      Yup.string().oneOf[
        ("Сидячий", "Слабо", "Середній", "Активний", "Сильна активність")
      ],
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
                color: "var(--dark)",
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
                    Введіть ім’я та фамілію
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
                      Ваш день народження
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
                    Оберіть свою стать
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
                          <em>Оберіть стать</em>
                        </MenuItem>
                        <MenuItem value={"Чоловік"}>Чоловік</MenuItem>
                        <MenuItem value={"Жінка"}>Жінка</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <ErrorMessage name="sex" component="div" className="error" />
                </div>

                {/* Telephone */}

                <div className="input_wrapper">
                  <label htmlFor="phone" className={css.setup_label}>
                    Введіть свій номер телефону
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
                    Позначте свою секцію
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
                          <em>Оберіть відділ</em>
                        </MenuItem>
                        <MenuItem value={"Спортивний зал"}>
                          Спортивний зал
                        </MenuItem>
                        <MenuItem value={"Реабілітація та масаж"}>
                          Реабілітація та масаж
                        </MenuItem>
                        <MenuItem value={"Йога"}>Йога</MenuItem>
                        <MenuItem value={"Дитячі танці"}>Дитячі танці</MenuItem>
                        <MenuItem value={"Ендосфера"}>Ендосфера</MenuItem>
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
                    Введіть ваш ріст
                    <Field
                      name="height"
                      type="number"
                      placeholder="Ріст / См"
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
                    Введіть вашу вагу
                    <Field
                      name="weight"
                      type="number"
                      placeholder="Вага / Кг"
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
                    Позначте свою ціль
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
                          <em>Оберіть мету</em>
                        </MenuItem>
                        <MenuItem value={"Схуднення"}>Схуднення</MenuItem>
                        <MenuItem value={"Утримати вагу"}>
                          Утримати вагу
                        </MenuItem>
                        <MenuItem value={"Повільний набір маси"}>
                          Повільний набір маси
                        </MenuItem>
                        <MenuItem value={"Активний набір маси"}>
                          Активний набір маси
                        </MenuItem>
                        <MenuItem value={"Набір сухої мязової маси"}>
                          Набір сухої мязової маси
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
                    Оберіть свій рівень активності
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
                        <MenuItem value={"Сидячий"}>Сидячий</MenuItem>
                        <MenuItem value={"Слабо"}>Слабо</MenuItem>
                        <MenuItem value={"Середній"}>Середній</MenuItem>
                        <MenuItem value={"Активний"}>Активний</MenuItem>
                        <MenuItem value={"Сильна активність"}>
                          Сильна активність
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
              <Button
                type="submit"
                styles={{ maxWidth: "226px", marginTop: "auto" }}
              >
                Зберегти
              </Button>
              <ReverseBtn
                type="button"
                styles={{ maxWidth: "226px", marginTop: "auto" }}
                action={resetForm}
              >
                Очистити
              </ReverseBtn>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileSetup;
