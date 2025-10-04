import React from "react";

import css from "./Trainers.module.css";
import { Link } from "react-router-dom";

function TrainerItem({ name, category, photo, link }) {
  return (
    <div className={css.trainer_block}>
      <Link to={`/team/${link}`}>
        <div className={css.detail_link}>Дізнатись більше</div>
      </Link>
      <div className={css.image_wrapper}>
        <img className={css.image} src={photo} alt="Fitness trainer" />
        <div className={css.content_wrapper}>
          <h4>{name}</h4>
          <h5 className={css.category}>{category}</h5>
        </div>
      </div>
    </div>
  );
}

export default TrainerItem;
