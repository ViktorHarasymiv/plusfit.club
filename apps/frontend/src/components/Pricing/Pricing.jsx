import React from "react";

import css from "./Pricing.module.css";

import SectionTitle from "../SectionTitle/SectionTitle";
import Plans from "./Plans";

export default function Pricing() {
  return (
    <section id="tarife">
      <SectionTitle
        title={"Pricing"}
        about={"Best Pricing Plan For You"}
      ></SectionTitle>
      <Plans></Plans>
    </section>
  );
}
