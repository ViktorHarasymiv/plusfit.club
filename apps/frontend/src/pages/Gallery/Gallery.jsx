import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import GalleryContent from "./GalleryContent";
import Reviews from "../../components/Reviews/Reviews";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function Gallery() {
  document.title = "Плюс Фіт - Галерея";
  return (
    <main>
      <section className="self_section">
        <NavigationContext />
        <SectionTitle title={"Our gallery"} about={"Портфоліо"} />
        <GalleryContent />
        <Reviews />
        <CommentForm />
      </section>
    </main>
  );
}
