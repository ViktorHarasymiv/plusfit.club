import React from "react";

import style from "./Button.module.css";

import { IoMdArrowRoundForward } from "react-icons/io";

export default function Button({ children, type, action }) {
  return (
    <button onClick={action} type={type} className={style.button}>
      {children}
      <IoMdArrowRoundForward />
    </button>
  );
}
