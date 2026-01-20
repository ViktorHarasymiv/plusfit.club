import Hero from "../../components/Hero/Hero";
import Preference from "../../components/Preference/Preference";

import CalculatorCalories from "../../components/CalculatorCalories/CalculatorCalories";
import Trainers from "../../components/Trainers/Trainers";
import Pricing from "../../components/Pricing/Pricing";
import CommentForm from "../../components/CommentForm/CommentForm";
import Reviews from "../../components/Reviews/Reviews";
import EatBrand from "../../components/EatBrand/EatBrand";
import TotalArea from "../../components/TotalArea/TotalArea";
import Blog from "../../components/Blog/Blog";
import AboutUsComponent from "../../components/AboutUsComponent/AboutUsComponent";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

export default function Home() {
  document.title = "Iron Mass | Fitness club";

  return (
    <main>
      <Hero />
      <Preference />
      <AboutUsComponent />
      <Trainers />
      <Pricing />
      <WhyChooseUs />
      <CalculatorCalories />
      <TotalArea />
      <Blog />
      <EatBrand />
      <Reviews />
      <CommentForm />
    </main>
  );
}
