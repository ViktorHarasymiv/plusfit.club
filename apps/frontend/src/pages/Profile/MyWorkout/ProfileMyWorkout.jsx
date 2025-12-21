import WorkoutTabs from "./WorkoutTabs/WorkoutTabs";

import css from "./Style.module.css";

export default function ProfileMyWorkout() {
  return (
    <div className={css.workout_wrapper}>
      <WorkoutTabs />
    </div>
  );
}
