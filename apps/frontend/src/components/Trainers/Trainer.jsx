import React from "react";
import { motion } from "framer-motion";

import css from "./Trainers.module.css";

import gymTrainer from "/img/gymRetush.png";
import fitnessTrainer from "/img/fitness.PNG";
import therapiPhoto from "/img/kozacka1.PNG";

export default function Trainer({ selectedCategory }) {
  const dataTreiners = [
    {
      id: 0,
      name: "Довгалюк Уляна",
      category: "Терапія та ерготерапія",
      filter: "Therapi",
      photo: therapiPhoto,
    },
    {
      id: 1,
      name: "Довгалюк Уляна",
      category: "Фітнес тренування",

      filter: "Gym",
      photo: fitnessTrainer,
    },
    {
      id: 2,
      name: "Іван Ковальчук",
      category: "Силові тренування",

      filter: "Gym",
      photo: gymTrainer,
    },
  ];

  const selectedGroup = selectedCategory || null;

  return (
    <div className="container">
      <div className={css.wrapper}>
        {dataTreiners
          .filter(({ filter }) => {
            if (!selectedGroup) return true;
            return filter === selectedGroup;
          })
          .map(({ name, category, photo }, index) => {
            return (
              <motion.div
                key={index}
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
                      src={photo}
                      alt="Fitness trainer"
                    />
                    <div className={css.content_wrapper}>
                      <h4>{name}</h4>
                      <h5 className={css.category}>{category}</h5>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
      {/* <div className={css.wrapper}>
        <motion.div
          initial={{ opacity: 0, y: -35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        >
          <div className={css.trainer_block}>
            <div className={css.detail_link}>Перейти до інформації</div>
            <div className={css.image_wrapper}>
              <img className={css.image} src={trainer3} alt="Fitness trainer" />
              <div className={css.content_wrapper}>
                <h4>Козачка 1</h4>
                <h5>Fitness Trainer</h5>
              </div>
            </div>
          </div>
        </motion.div>
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
                <h4>Козак 2</h4>
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
                <h4>Козачка 3</h4>
                <h5>Fitness Trainer</h5>
              </div>
            </div>
          </div>
        </motion.div>
      </div> */}
    </div>
  );
}
