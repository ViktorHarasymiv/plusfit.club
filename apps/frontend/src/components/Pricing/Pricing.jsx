import SectionTitle from "../SectionTitle/SectionTitle";
import Plans from "./Plans";

export default function Pricing() {
  return (
    <section id="tarife">
      <SectionTitle title={"Pricing"} about={"Subscription"} />
      <Plans />
    </section>
  );
}
