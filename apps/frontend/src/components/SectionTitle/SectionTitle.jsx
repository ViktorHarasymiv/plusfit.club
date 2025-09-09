import React from "react";

import css from "./SectionTitle.module.css";

import { CgGym } from "react-icons/cg";

export default function SectionTitle({ title, about }) {
  return (
    <div className={css.title}>
      <div className={css.title_text_wrapper}>
        <CgGym></CgGym>
        <h1 className={css.title_text}>{title}</h1>
      </div>
      <h2 className={css.title_text_about}>{about}</h2>
      <div className={css.decor_element}></div>
    </div>
  );
}
