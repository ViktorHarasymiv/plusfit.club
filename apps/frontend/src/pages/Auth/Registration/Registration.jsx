import { useAuthModalStore } from "../../../store/useAuthModalStore";

import { Link } from "react-router-dom";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./Style.module.css";

import Modal from "../../../components/ui/Modal/Modal";
import Button from "../../../components/ui/Button/Button";

import logoLight from "/logo/logoLight.png";

import { MdOutlineMail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { GrSecure } from "react-icons/gr";

import { IoCheckmark } from "react-icons/io5";
import { register } from "../../../services/auth";

function Registration() {
  const { isSignUpOpen, closeSignUp } = useAuthModalStore();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  const registerUserSchema = Yup.object({
    name: Yup.string()
      .min(3, "Ім’я має містити щонайменше 3 символи")
      .max(30, "Ім’я не може перевищувати 30 символів")
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Ім’я має містити прізвище та ім’я через пробіл"
      )
      .required("Ім’я обов’язкове"),

    email: Yup.string()
      .email("Некоректний email")
      .required("Email обов’язковий"),

    password: Yup.string().required("Пароль обов’язковий"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не збігаються")
      .required("Підтвердження пароля обов’язкове"),

    acceptedTerms: Yup.boolean()
      .oneOf([true], "Потрібно погодитися з умовами")
      .required("Потрібно погодитися з умовами"),
  });

  const styleObj = {
    maxWidth: "500px",
    width: "90%",
    maxHeight: "100%",
    borderRadius: "8px",

    backgroundColor: "rgba(0, 0, 0, 0.3)",
  };

  const hundlerSubmit = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, ...payload } = values;

    try {
      await register(payload); // твій API-запит
      resetForm(); // очищення форми після успіху
      // можеш додати toast або модалку успіху
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      // можеш показати повідомлення про помилку
    } finally {
      setSubmitting(false); // знімає блокування кнопки
    }
  };

  return (
    <>
      <Modal isOpen={isSignUpOpen} onClose={closeSignUp} styles={styleObj}>
        <img
          src={logoLight}
          alt="Firm logo"
          width={96}
          height={45}
          className="form_logo"
        />
        <h1 className="form_title">Реєстрація</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={registerUserSchema}
          onSubmit={hundlerSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form className="form_wrapper">
              <div className="input_wrapper">
                <Field
                  name="email"
                  type="email"
                  placeholder=""
                  className="input"
                  style={{
                    borderColor:
                      errors.email && touched.email
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="email" className="label">
                  <MdOutlineMail className="form_icon" /> Введіть емейл
                </label>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field
                  name="name"
                  type="name"
                  placeholder=""
                  className="input"
                  style={{
                    borderColor:
                      errors.name && touched.name
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="name" className="label">
                  <HiOutlineUser className="form_icon" /> Ваше ім'я та фамілія
                </label>
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field
                  name="password"
                  type="password"
                  placeholder=""
                  className="input"
                  autoComplete="new-password"
                  style={{
                    borderColor:
                      errors.password && touched.password
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="password" className="label">
                  <GrSecure className="form_icon" /> Введіть пароль
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="input_wrapper">
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                  className="input"
                  style={{
                    borderColor:
                      errors.confirmPassword && touched.confirmPassword
                        ? "var(--pastel-red)"
                        : "inherit",
                  }}
                />
                <label htmlFor="confirmPassword" className="label">
                  <GrSecure className="form_icon" /> Повторіть свій пароль
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

                  <Link to={"/policy"} className="terms_link">
                    Я погоджуюсь з
                    <span> умовами зберігання та обробки данних</span>
                  </Link>
                </label>
                {errors.acceptedTerms && touched.acceptedTerms && (
                  <div className="error">{errors.acceptedTerms}</div>
                )}
              </div>
              <Button
                type="submit"
                styles={{ maxWidth: "226px", marginTop: "auto" }}
              >
                Зареєструватися
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default Registration;
