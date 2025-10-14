import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import TotalArea from "../../components/TotalArea/TotalArea";
import Reviews from "../../components/Reviews/Reviews";
import Trainer from "../../components/Trainers/Trainer";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function AboutUs() {
  return (
    <main>
      <NavigationContext />
      <Trainer />
      <TotalArea />
      <Reviews />
      <CommentForm />
    </main>
  );
}
