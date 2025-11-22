import { useAuthModalStore } from "../../store/useAuthModalStore";
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Logo from "../../components/Logo/Logo";

import { IoCheckmark } from "react-icons/io5";

import { MdOutlineMail } from "react-icons/md";
import { GrSecure } from "react-icons/gr";

import Button from "../ui/Button/Button";
import { handleGoogleLogin } from "../../services/auth";

function Login() {
  const navigate = useNavigate();
  const { closeSignIn } = useAuthModalStore();
  const { getLogin, fetchUser } = useAuth();

  const initialValues = {
    email: "",
    password: "",
    acceptedTerms: false,
  };

  const registerUserSchema = Yup.object({
    email: Yup.string()
      .email("Некоректний email")
      .required("Email обов’язковий"),

    password: Yup.string().required("Пароль обов’язковий"),

    acceptedTerms: Yup.boolean()
      .oneOf([true], "Потрібно погодитися з умовами")
      .required("Потрібно погодитися з умовами"),
  });

  const handlerSubmit = async (values) => {
    try {
      const { acceptedTerms, ...payload } = values;
      await getLogin(payload);
      await fetchUser();
      closeSignIn();
      navigate("/profile");

      // Можна додати логіку після успішного логіну
    } catch (error) {
      console.error("Login failed:", error);
      // Можна показати повідомлення користувачу або оновити стан
    }
  };

  return (
    <>
      <Logo />
      <h1 className="form_title">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={registerUserSchema}
        onSubmit={handlerSubmit}
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
                <MdOutlineMail className="form_icon" />
                Enter email
              </label>
              <ErrorMessage name="email" component="div" className="error" />
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
              <ErrorMessage name="password" component="div" className="error" />
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
            <div className="action_wrapper ">
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
    </>
  );
}

export default Login;
