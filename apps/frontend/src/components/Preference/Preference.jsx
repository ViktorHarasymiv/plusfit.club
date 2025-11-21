import React from "react";

import style from "./Preference.module.css";
import PreferenceItem from "./PreferenceItem";

const preferenceArray = [
  {
    id: 0,
    icon: "icon-gym",
    title: "Equipment",
    about:
      "Our gym has 38 modern exercise machines that allow people with different levels of training to train comfortably and effectively, from beginners to professionals.",
  },
  {
    id: 1,
    icon: "icon-muscle",
    title: "Trainers",
    ref: "trainer",
    about:
      "The heart of any gym is not only the equipment, but also the people who help achieve results. Our team includes two professional trainers.",
  },
  {
    id: 2,
    icon: "icon-dumbbell",
    title: "Best practices",

    about:
      "We have created a space where everyone can choose their own path – whether it's classic strength training, body and soul practice, or a child's first steps in sports.",
  },
  {
    id: 3,
    icon: "icon-moneyBag",
    title: "Affordable price",
    ref: "tarife",
    about:
      "We believe that sports should be accessible to everyone. That is why our gym has a transparent and flexible payment system so that you can choose the option that best suits your goals, capabilities, and lifestyle.",
  },
];

export default function Preference() {
  return (
    <section id="preferens_section">
      <h1 className="visually-hidden">Preference section</h1>
      <div className="container">
        <div className={style.preferens_wrapper}>
          {preferenceArray.map((data, i) => {
            return <PreferenceItem key={i} index={i} data={data} />;
          })}
        </div>
      </div>
    </section>
  );
}
