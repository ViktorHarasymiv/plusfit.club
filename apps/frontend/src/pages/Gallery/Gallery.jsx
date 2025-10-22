import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import GalleryContent from "./GalleryContent";
import Reviews from "../../components/Reviews/Reviews";
import CommentForm from "../../components/CommentForm/CommentForm";
import EatBrand from "../../components/EatBrand/EatBrand";

export default function Gallery() {
  document.title = "Плюс Фіт - Галерея";
  return (
    <main>
      <NavigationContext />
      <SectionTitle title={"Our gallery"} about={"Портфоліо"} />
      <GalleryContent />
      <Reviews />
      <CommentForm />
      <EatBrand />
    </main>
  );
}
