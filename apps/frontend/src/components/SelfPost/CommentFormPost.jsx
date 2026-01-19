import { useAuth } from "../../context/AuthContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import Button from "../ui/Button/Button";

import style from "../CalculatorCalories/Form/FormCalculate.module.css";
import css from "./Style.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { API_URL } from "../../config/api";
import { useToastStore } from "../../store/toastStore";

import { BsSendCheckFill } from "react-icons/bs";
import { BsSendSlashFill } from "react-icons/bs";

export default function CommentFormPost({ postId, fetchNewComment }) {
  const { user } = useAuth();
  const { showToast } = useToastStore();

  const userId = user._id;

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
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

    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(340, "Message must be at most 340 characters"),
  });

  /* SUBMIT */

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const request = {
        text: values.message,
        postId,
        userId,
      };

      await axios.post(`${API_URL}/posts/comments`, request);

      fetchNewComment(postId);
      showToast(
        <span style={{ display: "flex", alignItems: "center" }}>
          <BsSendCheckFill
            style={{
              color: "var(--white)",
              marginRight: "6px",
            }}
          />
          Your feedback has been sent.
        </span>,
      );
      resetForm();
    } catch (error) {
      if (error?.response?.status === 403) {
        showToast(
          <span style={{ display: "flex", alignItems: "center" }}>
            <BsSendSlashFill
              style={{
                color: "var(--white)",
                marginRight: "6px",
              }}
            />
            Feedback is only allowed for users.
          </span>,
        );
      } else {
        alert(
          error?.message ||
            showToast(
              <span style={{ display: "flex", alignItems: "center" }}>
                <MdAddCard
                  style={{
                    color: "var(--white)",
                    marginRight: "6px",
                  }}
                />
                Error sending feedback.
              </span>,
            ),
        );
      }
      return;
    }
  };

  return (
    <div className={css.form_block}>
      <h2 className={css.comment_title}>Leave A Comment</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className={css.form_wrapper}>
            <div className={css.first_column}>
              {/* Name */}
              <div className={css.input_wrapper} style={{ maxWidth: "100%" }}>
                <Field
                  name="name"
                  type="text"
                  placeholder="Your Name*"
                  className={`${style.input} ${css.input}`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Email */}
              <div className={css.input_wrapper} style={{ maxWidth: "100%" }}>
                <Field
                  name="email"
                  type="text"
                  placeholder="Your E-mail*"
                  className={`${style.input} ${css.input}`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
              </div>
            </div>

            {/* Textarea */}
            <div
              className={css.input_wrapper}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <TextField
                multiline
                name="message"
                label="Your Comment*"
                rows={6}
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
                maxWidth: "186px",
                maxHeight: "54px",
              }}
            >
              {"Post comment"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
