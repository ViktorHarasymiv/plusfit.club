import SectionTitle from "../SectionTitle/SectionTitle";
import Treiner from "./Trainer";

export default function Trainers() {
  return (
    <section id="trainer">
      <div className="container">
        <SectionTitle title={"Our Team"} about={"Наша команда"} />
        <Treiner />
      </div>
    </section>
  );
}
