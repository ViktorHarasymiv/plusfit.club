import { useAuthModalStore } from "../../store/useAuthModalStore";

import { Link, useNavigate } from "react-router-dom";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Logo from "../../components/Logo/Logo";
import Button from "../../components/ui/Button/Button";

import { MdOutlineMail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { GrSecure } from "react-icons/gr";

import { IoCheckmark } from "react-icons/io5";
import { register } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

import { handleGoogleLogin } from "../../services/auth";

function Registration() {
  const navigate = useNavigate();

  const { closeSignUp } = useAuthModalStore();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  const registerUserSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must contain at least 3 characters")
      .max(30, "Name cannot exceed 30 characters")
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Name must contain first name and last name separated by a space"
      )
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string().required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Password confirmation is required"),

    acceptedTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required("You must accept the terms"),
  });

  const hundlerSubmit = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, ...payload } = values;

    try {
      await register(payload); // твій API-запит
      resetForm(); // очищення форми після успіху
      closeSignUp();
      navigate("/verify", { state: { email: payload.email } });

      // closeSignUp();
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      // можеш показати повідомлення про помилку
    } finally {
      setSubmitting(false); // знімає блокування кнопки
    }
  };

  return (
    <>
      <div>
        <Logo />
        <h1 className="form_title">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={registerUserSchema}
          onSubmit={hundlerSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form className="form_wrapper">
              <div className="input_wrapper full_width">
                <Field
                  name="email"
                  type="email"
                  placeholder=""
                  className="input"
                  autoFocus={false}
                  style={{
                    borderColor:
                      errors.email && touched.email
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="email" className="label">
                  <MdOutlineMail className="form_icon" /> Enter email
                </label>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input_wrapper full_width">
                <Field
                  name="name"
                  type="name"
                  placeholder=""
                  className="input"
                  autoFocus={false}
                  style={{
                    borderColor:
                      errors.name && touched.name
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="name" className="label">
                  <HiOutlineUser className="form_icon" /> Enter full name
                </label>
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="input_wrapper full_width">
                <Field
                  name="password"
                  type="password"
                  placeholder=""
                  className="input"
                  autoComplete="new-password"
                  autoFocus={false}
                  style={{
                    borderColor:
                      errors.password && touched.password
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="password" className="label">
                  <GrSecure className="form_icon" /> Enter password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="input_wrapper full_width">
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                  className="input"
                  autoFocus={false}
                  style={{
                    borderColor:
                      errors.confirmPassword && touched.confirmPassword
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="confirmPassword" className="label">
                  <GrSecure className="form_icon" /> Repeat password
                </label>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
              <div className="input_wrapper">
                <label className="checkbox_label">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={values.acceptedTerms}
                    onChange={handleChange}
                    className="form_checkbox"
                  />
                  <div className="custum_checkbox">
                    <IoCheckmark className="checkbox_icon" />
                  </div>

                  <Link to={"/private-policy"} className="terms_link">
                    I agree with
                    <span> conditions of data storage and processing</span>
                  </Link>
                </label>
                {errors.acceptedTerms && touched.acceptedTerms && (
                  <div className="error">{errors.acceptedTerms}</div>
                )}
              </div>
              <div className="action_wrapper">
                <Button
                  type="submit"
                  styles={{
                    maxWidth: "226px",
                    maxHeight: "38px",
                    marginTop: "auto",
                  }}
                >
                  Enter
                </Button>
                <Button
                  type="button"
                  styles={{
                    maxWidth: "226px",
                    maxHeight: "38px",
                    marginTop: "auto",
                  }}
                  action={handleGoogleLogin}
                >
                  Google
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Registration;
