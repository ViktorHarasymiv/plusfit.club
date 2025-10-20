import { useAuthModalStore } from "../../store/useAuthModalStore";

import { Link } from "react-router-dom";

import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Modal from "../../components/ui/Modal/Modal";
import Button from "../../components/ui/Button/Button";

import logoLight from "/logo/logoLight.png";

import { MdOutlineMail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { GrSecure } from "react-icons/gr";

import { IoCheckmark } from "react-icons/io5";
import { register } from "../../services/auth";
import Registration from "../../components/Registration/Registration";

function RegistrationModal() {
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
    <Modal isOpen={isSignUpOpen} onClose={closeSignUp} styles={styleObj}>
      <Registration />
    </Modal>
  );
}

export default RegistrationModal;
