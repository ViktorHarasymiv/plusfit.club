import React from "react";

import Hero from "../../components/Hero/Hero";
import Preference from "../../components/Preference/Preference";

import { useWindowWidth } from "../../hooks/useWindowWidth";
import CalculatorCalories from "../../components/CalculatorCalories/CalculatorCalories";
import Trainers from "../../components/Trainers/Trainers";
import Pricing from "../../components/Pricing/Pricing";
import CommentForm from "../../components/CommentForm/CommentForm";
import Reviews from "../../components/Reviews/Reviews";
import EatBrand from "../../components/EatBrand/EatBrand";
import TotalArea from "../../components/TotalArea/TotalArea";
import Blog from "../../components/Blog/Blog";
export default function Home() {
  const width = useWindowWidth();
  document.title = "Iron Mass - Sport complex";
  return (
    <main>
      <Hero />
      {width > 991.98 && <Preference />}
      <Trainers />
      <Pricing />
      <CalculatorCalories />
      <TotalArea />
      <Blog />
      <EatBrand />
      <Reviews />
      <CommentForm />
    </main>
  );
}
