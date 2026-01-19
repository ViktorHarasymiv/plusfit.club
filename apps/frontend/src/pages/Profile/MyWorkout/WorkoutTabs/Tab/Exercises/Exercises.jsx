import React, { useEffect, useRef, useState } from "react";
import ExercisesTabs from "./ExercisesTabs";
import ExercisesList from "./ExercisesList";
import GroupList from "./GroupList";
import { useExercisesStore } from "../../../../../../store/exercises.store";

function Exercises() {
  const { exercises } = useExercisesStore();

  const [tab, setTab] = useState("Muscles");
  const topRef = useRef(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    if (topRef.current) {
      setY(topRef.current.getBoundingClientRect().top + window.scrollY - 100);
    }
  }, []);

  return (
    <div ref={topRef}>
      <ExercisesTabs setTab={setTab} tab={tab} />
      {exercises.length < 1 ? (
        <GroupList current={tab} scrollY={y} />
      ) : (
        <ExercisesList exercises={exercises} />
      )}
    </div>
  );
}

export default Exercises;
