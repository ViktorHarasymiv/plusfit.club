import React from "react";

import style from "./Preference.module.css";

import Icon from "../ui/Icon/Icon";

export default function PreferenceItem({ data }) {
  return (
    <div className={style.item_wrapper}>
      <div className={style.content_wrapper}>
        <Icon name={data.icon} size={28} className="icon" />
        <h4>
          <a href={`#${data.ref}`}>{data.title}</a>
        </h4>
        <span>{data.about}</span>
      </div>
    </div>
  );
}
