import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import Reviews from "../../components/Reviews/Reviews";
import Trainer from "../../components/Trainers/Trainer";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function AboutUs() {
  return (
    <main>
      <section>
        <NavigationContext />
        <Trainer />
        <Reviews />
        <CommentForm />
      </section>
    </main>
  );
}
