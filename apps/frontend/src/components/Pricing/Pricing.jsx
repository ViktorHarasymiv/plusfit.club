import React from "react";

import css from "./Pricing.module.css";

import SectionTitle from "../SectionTitle/SectionTitle";
import Plans from "./Plans";

export default function Pricing() {
  return (
    <section id="tarife">
      <SectionTitle title={"Pricing"} about={"Абонемент"}></SectionTitle>
      <Plans></Plans>
    </section>
  );
}
