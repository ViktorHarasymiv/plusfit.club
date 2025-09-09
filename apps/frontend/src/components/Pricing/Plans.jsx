import React from "react";

import Item from "./Item";
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
        nutritionist: false,
        massage: false,
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
        nutritionist: false,
        massage: false,
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
        nutritionist: true,
        massage: false,
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
        nutritionist: true,
        massage: true,
        sale: 750,
      },
    },
  ];
  return (
    <div className={css.tarife_wrapper}>
      <div className="container">
        <ul className={css.list}>
          {subscriptionPlans.map((tarife, i) => {
            return <Item key={i} data={tarife} />;
          })}
        </ul>
      </div>
    </div>
  );
}
