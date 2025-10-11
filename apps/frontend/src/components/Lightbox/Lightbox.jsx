import React, { useEffect } from "react";

import { LuPlus } from "react-icons/lu";

import css from "./Style.module.css";

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    if (e.key === "ArrowLeft")
      onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className={css.lightbox_overlay} onClick={onClose}>
      <div
        className={css.lightbox_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.nav_btn_left}
          onClick={() =>
            onNavigate((currentIndex - 1 + images.length) % images.length)
          }
        >
          ‹
        </button>
        <img
          src={images[currentIndex].src}
          alt={`Image ${currentIndex}`}
          className={css.lightbox_image}
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
        />
        <button
          className={css.nav_btn_right}
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
        >
          ›
        </button>
      </div>
      <button className={css.close_btn} onClick={onClose}>
        <LuPlus />
        Esc
      </button>
    </div>
  );
}
