import css from "./Style.module.css";
import TrainerSwiper from "./TeamSwiper/TeamSwiper";
import TrainerContent from "./TrainerContent/TrainerContent";

function Team() {
  return (
    <section className={css.section}>
      <TrainerContent />
    </section>
  );
}

export default Team;
