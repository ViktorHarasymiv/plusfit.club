import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../../../context/AuthContext";

import style from "./Login.module.css";
import Button from "../../../ui/Button/Button";

export default function Login() {
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await login(values.email, values.password);

      resetForm();
      return;
    } catch (error) {
      return error;
    }
  };

  return (
    <main>
      <div
        style={{ backgroundImage: "url(/img/background.jpg)" }}
        className={style.form}
      >
        <div className={style.form_wrapper}>
          <h1 className={style.title}>Вхід в адмін панель</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={style.form_content_wrapper}>
              <div className={style.wrapper}>
                <div className={style.input_wrapper}>
                  {/* E-MAIL */}
                  <Field
                    name="email"
                    type="text"
                    placeholder="Е-мейл"
                    className={style.input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={style.error}
                  />
                </div>

                {/* PASSWORD */}
                <div className={style.input_wrapper}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className={style.input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={style.error}
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <Button
                type={"submit"}
                styles={{
                  justifyContent: "center",
                  maxWidth: "276px",
                  width: "100%",
                }}
              >
                {"Увійти"}
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
