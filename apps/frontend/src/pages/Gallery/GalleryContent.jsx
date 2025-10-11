import React, { useState } from "react";
import GalleryTabsButton from "./GalleryTabsButton";

import css from "./Style.module.css";

import GalleryImage from "./GalleryImage";
import FullscreenViewer from "../../components/FullscreenViewer/FullscreenViewer";

function GalleryContent() {
  const [filter, setFiter] = useState("Усі");

  const tabsGalleryList = [
    "Усі",
    "Тренажерний зал",
    "Масаж",
    "Реабілітація",
    "Йога",
    "Дитячі танці",
    "Ендосфера",
  ];

  const galleryImages = [
    {
      src: "/img/background.jpg",
      filters: [],
    },
    {
      src: "/img/01.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/02.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/navBarBg.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/navBarBg1.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/slider/slider-1.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/gymBg.jpg",
      filters: ["Тренажерний зал"],
    },
    {
      src: "/img/yoga.jpg",
      filters: ["Йога"],
    },
    {
      src: "/img/yoga1.jpg",
      filters: ["Йога"],
    },
    {
      src: "/img/yoga2.jpg",
      filters: ["Йога"],
    },
    {
      src: "/img/massage1.jpg",
      filters: ["Масаж"],
    },
    {
      src: "/images/massage2.jpg",
      filters: ["Масаж"],
    },
    {
      src: "/img/rehab1.jpg",
      filters: ["Реабілітація"],
    },
    {
      src: "/images/rehab2.jpg",
      filters: ["Реабілітація"],
    },
    {
      src: "/img/kids/FrontKids.jpg",
      filters: ["Дитячі танці"],
    },
    {
      src: "/img/kids/kids1.JPG",
      filters: ["Дитячі танці"],
    },
    {
      src: "/img/kids/kids2.JPG",
      filters: ["Дитячі танці"],
    },
    {
      src: "/img/Endosphere.PNG",
      filters: ["Ендосфера"],
    },
    {
      src: "/images/endosphere2.jpg",
      filters: ["Ендосфера"],
    },
  ];

  return (
    <div className="container">
      <GalleryTabsButton
        data={tabsGalleryList}
        filter={filter}
        setFiter={setFiter}
      />
      <GalleryImage data={galleryImages} filter={filter} />
      <FullscreenViewer />
    </div>
  );
}

export default GalleryContent;
