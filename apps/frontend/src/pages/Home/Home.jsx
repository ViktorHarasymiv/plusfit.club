import React from "react";

import Hero from "../../components/Hero/Hero";
import Preference from "../../components/Preference/Preference";

import { useWindowWidth } from "../../hooks/useWindowWidth";
import CalculatorCalories from "../../components/CalculatorCalories/CalculatorCalories";
import Trainers from "../../components/Trainers/Trainers";
import Pricing from "../../components/Pricing/Pricing";

export default function Home() {
  const width = useWindowWidth();

  return (
    <main>
      <Hero></Hero>
      {width > 991.98 && <Preference />}
      <Trainers />
      <Pricing />
      <CalculatorCalories />
    </main>
  );
}
