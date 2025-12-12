import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import TotalArea from "../../components/TotalArea/TotalArea";
import Reviews from "../../components/Reviews/Reviews";
import Trainer from "../../components/Trainers/Trainer";
import CommentForm from "../../components/CommentForm/CommentForm";
import EatBrand from "../../components/EatBrand/EatBrand";
import AboutUsComponent from "../../components/AboutUsComponent/AboutUsComponent";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

export default function AboutUs() {
  return (
    <main>
      <NavigationContext />
      <AboutUsComponent />
      <>
        <SectionTitle title={"Our Team"} about={"Meet With Expert Trainers"} />
        <Trainer />
      </>
      <TotalArea />
      <Reviews />
      <CommentForm />
      <EatBrand />
    </main>
  );
}
