import React from "react";
import Item from "./Item";

import { motion } from "framer-motion";
import css from "./Pricing.module.css";

export default function Plans() {
  const subscriptionPlans = [
    {
      name: "Початковий",
      title: "Одне тренування",
      price: 100,
      currency: "ГРН",
      services: {
        time: "12:00 - 18:00",
        gym: true,
        fitness: false,
        consultation: false,
      },
    },
    {
      name: "Стандартний",
      title: "Один місяць тренувань",
      price: 700,
      currency: "ГРН",
      date: "місяць",
      services: {
        time: "9:00 - 21:00",
        gym: true,
        fitness: true,
        consultation: false,
      },
    },
    {
      name: "Преміум",
      title: "Три місяці тренувань",
      price: 1850,
      currency: "ГРН",
      services: {
        time: "9:00 - 21:00",
        gym: true,
        fitness: true,
        consultation: true,
        sale: 250,
      },
    },
    {
      name: "Елітний",
      title: "Річний доступ до тренувань",
      price: 6550,
      currency: "ГРН",
      services: {
        time: "9:00 - 21:00",
        gym: true,
        fitness: true,
        consultation: true,
        sale: 750,
      },
    },
  ];
  return (
    <div className={css.tarife_wrapper}>
      <div className="container">
        <ul className={css.list}>
          {subscriptionPlans.map((tarife, i) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: i === 0 || i === 2 ? -30 : 30,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                key={i}
                className={css.motion}
              >
                <Item data={tarife} />
              </motion.div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
