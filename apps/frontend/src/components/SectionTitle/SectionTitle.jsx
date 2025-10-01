import React from "react";

import { motion } from "framer-motion";

import css from "./SectionTitle.module.css";

import { CgGym } from "react-icons/cg";

export default function SectionTitle({ title, about, styles }) {
  return (
    <div className={css.title}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        <div className={css.title_text_wrapper}>
          <CgGym></CgGym>
          <h1 className={css.title_text}>{title}</h1>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
      >
        <h2 className={css.title_text_about} style={styles}>
          {about}
        </h2>
        <div className={css.decor_element}></div>
      </motion.div>
    </div>
  );
}
