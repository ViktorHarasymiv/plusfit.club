import { useAuth } from "../../context/AuthContext";

import { AvatarPicker } from "../../components/AvatarPicker/AvatarPicker";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./Style.module.css";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { MdOutlineMail } from "react-icons/md";

import Button from "../../components/ui/Button/Button";

import ReverseBtn from "../../components/ui/Button/ReverseBtn";
import { useToastStore } from "../../store/toastStore";
import { useLoaderStore } from "../../store/loadingStore";
import Loader from "../../components/ui/Loader/Loader";

function ProfileSetup() {
  const { isLoading } = useLoaderStore();
  const { user, fetchUser, patchUser } = useAuth();

  const initialValues = {
    avatar: user.avatar || null,
    name: user.name || "",
    goal: user.goal || "",
    section: user.section || "",
    activityLevel: user.activityLevel || "",
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
    activityLevel:
      Yup.string().oneOf[
        ("Сидячий", "Слабо", "Середній", "Активний", "Сильна активність")
      ],
  });

  const handlerSubmit = async (formValues) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formValues)) {
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
            {/* Avatar */}

            <div className={css.coll_1}>
              <div className="input_wrapper">
                <AvatarPicker name={"avatar"} />
              </div>

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

                {/* Activity */}

                <div className="input_wrapper">
                  <label htmlFor="activityLevel" className={css.setup_label}>
                    Оберіть свій рівент активності
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
            </div>
            <div className="action_wrapper">
              <Button
                type="submit"
                styles={{ maxWidth: "226px", marginTop: "auto" }}
              >
                Зберегти зміни
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
