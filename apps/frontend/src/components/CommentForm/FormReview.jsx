import { useAuth } from "../../context/AuthContext";

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
  const { user } = useAuth();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    section: user?.section || "",
    rating: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(40, "Name must be at most 40 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(34, "Email must be at most 34 characters"),

    section: Yup.string().required("Section is required"),

    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),

    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(340, "Message must be at most 340 characters"),
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
      <SectionTitle title={"Leave a review"} about={"Leave your comment"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className={style.form_wrapper}>
            {/* Email */}
            <div className={style.input_wrapper} style={{ maxWidth: "304px" }}>
              <Field
                name="email"
                type="text"
                placeholder="E-mail"
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
                placeholder="Full name"
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
                    <em>Check a department</em>
                  </MenuItem>
                  <MenuItem value={"Gym"}>Gym</MenuItem>
                  <MenuItem value={"Fitness"}>Fitness</MenuItem>
                  <MenuItem value={"Massage"}>Massage</MenuItem>
                  <MenuItem value={"Rehabilitation"}>Rehabilitation</MenuItem>
                  <MenuItem value={"Yoga"}>Yoga</MenuItem>
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
                    <em>Your rating</em>
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
            <div
              className={style.input_wrapper}
              style={{ maxWidth: "304px", width: "100%", maxHeight: "100%" }}
            >
              <TextField
                multiline
                name="message"
                label="Your feedback"
                rows={4}
                value={values.message}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  backgroundColor: "transparent",

                  "& .MuiInputBase-root": {
                    color: "var(--body-text-color)",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--border-info-color)",
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
              <ErrorMessage
                name="message"
                component="div"
                className={style.error}
              />
            </div>

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
              {"Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
