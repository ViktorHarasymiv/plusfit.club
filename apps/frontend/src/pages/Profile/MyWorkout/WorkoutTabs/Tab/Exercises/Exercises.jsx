import React, { useState } from "react";
import ExercisesTabs from "./ExercisesTabs";
import ExercisesList from "./ExercisesList";
import GroupList from "./GroupList";
import { useExercisesStore } from "../../../../../../store/exercises.store";

function Exercises() {
  const [tab, setTab] = useState("Muscles");

  const { exercises } = useExercisesStore();

  return (
    <div>
      <ExercisesTabs setTab={setTab} tab={tab} />
      {exercises.length < 1 ? (
        <GroupList current={tab} />
      ) : (
        <ExercisesList exercises={exercises} />
      )}
    </div>
  );
}

export default Exercises;
