import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import Reviews from "../../components/Reviews/Reviews";
import Trainer from "../../components/Trainers/Trainer";

export default function AboutUs() {
  return (
    <main>
      <section>
        <NavigationContext />
        <Reviews />
        <Trainer />
      </section>
    </main>
  );
}
