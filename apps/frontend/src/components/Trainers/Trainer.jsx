import React from "react";
import { motion } from "framer-motion";

import css from "./Trainers.module.css";
import { useTrainerStore } from "../../store/trainerStore";
import TrainerItem from "./TrainerItem";

export default function Trainer({ selectedCategory }) {
  const dataTreiners = useTrainerStore((s) => s.trainers);

  const selectedGroup = selectedCategory || null;

  return (
    <div className="container">
      <div className={css.wrapper}>
        {dataTreiners
          .filter(({ filter }) => {
            if (!selectedGroup) return true;
            return filter === selectedGroup;
          })
          .map(({ name, category, photo, link }, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              >
                <TrainerItem
                  name={name}
                  category={category}
                  photo={photo}
                  link={link}
                ></TrainerItem>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
