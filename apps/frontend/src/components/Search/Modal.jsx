import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import css from "./Search.module.css";

import { GET_ONE } from "../../services/Api";
import { useEffect } from "react";

export default function Modal({ close }) {
  const [inputId, setInputId] = useState("");
  const [subscription, setSubscription] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  // Виклик API при зміні inputId
  useEffect(() => {
    const fetchData = async () => {
      if (inputId.length == 8) {
        try {
          const data = await GET_ONE(inputId);
          setSubscription({ id: data.data.clientId, name: data.data.fullName });
          setError(false);
        } catch (err) {
          setErrorMessage("Користувача не існує");
          setSubscription(null);
          setError(true);
        }
      }
    };
    if (inputId.length <= 7) {
      setErrorMessage("ID складається з 8 букв");
      setError(false);
      setSubscription(null);
    }
    if (inputId.length === 0) {
      setErrorMessage("");
      setError(false);
      setSubscription(null);
    }

    fetchData();
  }, [inputId]);

  // Обробка зміни інпуту
  const handleChange = (e) => {
    setInputId(e.target?.value.trim());
  };

  console.log(subscription);

  return (
    <div className={css.modal_wrapper}>
      <form action={handleChange} className={css.form}>
        <input
          type="text"
          placeholder="Введи ID код..."
          maxLength={8}
          onChange={(event) => {
            setInputId(event.target.value);
          }}
          className={css.modal_input}
        />
        {inputId.length > 0 && inputId.length <= 7 && (
          <ClipLoader
            className={css.modal_icon}
            size={16}
            color="rgb(253, 95, 38)"
          />
        )}
      </form>
      {subscription ? (
        <NavLink
          onClick={close}
          to={`/subscriber/${subscription?.id}`}
          className={css.user_name}
        >
          {subscription.name}
        </NavLink>
      ) : inputId.length > 0 ? (
        <span className={css.error_message}>{errorMessage}</span>
      ) : inputId.length === 0 ? null : null}
    </div>
  );
}
