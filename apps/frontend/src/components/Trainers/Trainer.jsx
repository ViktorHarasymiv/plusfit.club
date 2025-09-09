import React from "react";

import css from "./Trainers.module.css";

import gym_trainer from "/img/gymRetush.png";
import fitness_trainer from "/img/fitness.PNG";

export default function Trainer() {
  return (
    <div className={css.wrapper}>
      <div className={css.trainer_block}>
        <div className={css.detail_link}>Перейти до інформації</div>
        <div className={css.image_wrapper}>
          <img className={css.image} src={gym_trainer} alt="Gym trainer" />
          <div className={css.content_wrapper}>
            <h4>Ivan Kovalchuk</h4>
            <h5>Fitness Trainer</h5>
          </div>
        </div>
      </div>
      <div className={css.trainer_block}>
        <div className={css.detail_link}>Перейти до інформації</div>
        <div className={css.image_wrapper}>
          <img
            className={css.image}
            src={fitness_trainer}
            alt="Fitness trainer"
          />
          <div className={css.content_wrapper}>
            <h4>Elina Dobush</h4>
            <h5>Fitness Trainer</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
