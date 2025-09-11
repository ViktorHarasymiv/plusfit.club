import React from "react";

import { motion } from "framer-motion";

import style from "./Preference.module.css";

import Icon from "../ui/Icon/Icon";

export default function PreferenceItem({ data, index }) {
  return (
    <motion.div
      index={index}
      initial={{ opacity: 0, y: index === 0 || index === 2 ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    >
      <div className={style.item_wrapper}>
        <div className={style.content_wrapper}>
          <Icon name={data.icon} size={28} className="icon" />
          <h4>
            <a href={`#${data.ref}`}>{data.title}</a>
          </h4>
          <span>{data.about}</span>
        </div>
      </div>
    </motion.div>
  );
}
