import { useEffect } from "react";
import { useExercisesStore } from "../../../../../../store/exercises.store";
import Modal from "../../../../../../components/ui/Modal/Modal";

import css from "./Style.module.css";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

function ExercisesModal({ id, isOpen, onClose }) {
  const { getExerciseById, exercise } = useExercisesStore();

  useEffect(() => {
    const fetchByid = async () => {
      await getExerciseById(id);
    };
    fetchByid();
  }, [id]);

  console.log(exercise);

  if (!exercise) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} styles={{}}>
      <div className={css.modal_wrapper}>
        <IoMdClose onClick={() => onClose()} className={css.close_button} />
        <img
          src={exercise?.gifUrl}
          alt={exercise?.name}
          className={css.image}
        />
        <div className={css.content_wrapper}>
          <h1 className={css.modal_name}>{exercise.name}</h1>
          <div className={css.rating_wrapper}>
            {exercise.rating}
            <div>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {i < exercise.rating ? (
                    <FaStar className={css.icon} />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className={css.details_wrapper}>
            <div className={css.detail_tile}>
              <span>Target</span>
              <p>{exercise.target}</p>
            </div>
            <div className={css.detail_tile}>
              <span>Body Part</span>
              <p>{exercise.bodyPart}</p>
            </div>
            <div className={css.detail_tile}>
              <span>Equipment</span>
              <p>{exercise.equipment}</p>
            </div>
            <div className={css.detail_tile}>
              <span>Likes</span>
              <p>{exercise.popularity}</p>
            </div>
            <div className={css.detail_tile}>
              <span>Burned Calories</span>
              <p>
                {exercise.burnedCalories}Kkal \ {exercise.time} min
              </p>
            </div>
          </div>
          <div className={css.description}>{exercise.description}</div>
        </div>
      </div>
    </Modal>
  );
}

export default ExercisesModal;
