import React from "react";

import css from "./Style.module.css";
import { useState } from "react";
import WorkoutDay from "./WorkoutDay";
import Button from "../../../../../components/ui/Button/Button";

import { FaPlus } from "react-icons/fa";

function Workout() {
  const [plan, setPlan] = useState([
    {
      id: 0,
      title: "Day 1 – Chest + Triceps + Delts",
      hidden: false,
      editable: false,
      exercises: [
        "Bench press — 4×6–8",
        "Incline dumbbell press — 3×8–10",
        "Dumbbell curls lying down — 3×10–12",
        "Seated barbell/dumbbell press (shoulders) — 4×8–10",
        "Dumbbell Lateral Raises — 3×12–15",
        "French press (barbell/dumbbell) — 3×10–12",
        "Push-ups on the parallel bars — 3×max",
      ],
    },
    {
      id: 1,
      title: "Day 2 – Chest + Triceps + Delts",
      hidden: false,
      editable: false,
      exercises: [
        "Bench press — 4×6–8",
        "Incline dumbbell press — 3×8–10",
        "Dumbbell curls lying down — 3×10–12",
        "Seated barbell/dumbbell press (shoulders) — 4×8–10",
        "Dumbbell Lateral Raises — 3×12–15",
        "French press (barbell/dumbbell) — 3×10–12",
        "Push-ups on the parallel bars — 3×max",
      ],
    },
    {
      id: 2,
      title: "Day 3 – Chest + Triceps + Delts",
      hidden: false,
      editable: false,
      exercises: [
        "Bench press — 4×6–8",
        "Incline dumbbell press — 3×8–10",
        "Dumbbell curls lying down — 3×10–12",
        "Seated barbell/dumbbell press (shoulders) — 4×8–10",
        "Dumbbell Lateral Raises — 3×12–15",
        "French press (barbell/dumbbell) — 3×10–12",
        "Push-ups on the parallel bars — 3×max",
      ],
    },
  ]);

  const updateDay = (index, newDay) => {
    const updated = [...plan];
    updated[index] = newDay;
    setPlan(updated);
  };

  return (
    <div className={css.workout_wrapper}>
      <div className={css.title_wrapper}>
        <h1 className={css.title}>My training plan</h1>
        <button type="button" className={css.add_new_day}>
          <FaPlus />
          New day
        </button>
      </div>
      <div className={css.plan_wrapper}>
        {plan.map((day, i) => (
          <WorkoutDay
            key={i}
            dayIndex={i}
            dayData={day}
            updateDay={updateDay}
          />
        ))}
      </div>
    </div>
  );
}

export default Workout;
