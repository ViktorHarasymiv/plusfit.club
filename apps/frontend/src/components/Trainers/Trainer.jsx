import React from "react";
import { motion } from "framer-motion";

import css from "./Trainers.module.css";

import gym_trainer from "/img/gymRetush.png";
import fitness_trainer from "/img/fitness.PNG";

export default function Trainer({}) {
  return (
    <div className={css.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      >
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
      >
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
      </motion.div>
    </div>
  );
}
