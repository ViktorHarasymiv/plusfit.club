import React from "react";

import css from "./Trainers.module.css";

import SectionTitle from "../SectionTitle/SectionTitle";
import Treiner from "./Trainer";

export default function Trainers() {
  return (
    <section id="trainer" className={css.section}>
      <div className="container">
        <SectionTitle title={"Our Team"} about={"Meet With Expert Trainers"} />
        <Treiner />
      </div>
    </section>
  );
}
