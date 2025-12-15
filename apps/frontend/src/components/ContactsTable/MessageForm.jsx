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
import css from "./Style.module.css";
import TextField from "@mui/material/TextField";

import background from "/img/04.jpg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { CREATE_MESSAGE } from "../../services/message";

function MessageForm() {
  const { user } = useAuth();
  const width = useWindowWidth();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    section: user?.section || "",
    message: "",
    phone: user?.phone || "",
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

    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message must be at most 500 characters"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^(\+380|0)\d{9}$/,
        "Invalid phone number format. Example: +380XXXXXXXXX or 0XXXXXXXXX"
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
        <SectionTitle title={"Send message"} about={"Write your message"} />
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
                  placeholder="Email"
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
                  placeholder="Phone number"
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
                      <em>Check section</em>
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    <MenuItem value={"Gym"}>Gym</MenuItem>
                    <MenuItem value={"Fitness"}>Fitness</MenuItem>
                    <MenuItem value={"Yoga"}>Yoga</MenuItem>
                    <MenuItem value={"Massage"}>Massage</MenuItem>
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
                label="Your massage"
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
                {"Send"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default MessageForm;
