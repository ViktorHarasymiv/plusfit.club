import React from "react";

import css from "./Style.module.css";
import { useFullscreenStore } from "../../store/fullscreenStore";

function GalleryImage({ data, filter }) {
  const open = useFullscreenStore((s) => s.open);

  const filteredImages = data.filter(
    (img) => filter === "Усі" || img.filters.includes(filter)
  );

  return (
    <div className={css.images_wrapper}>
      {filteredImages.map(({ src, filters }, index) => (
        <img
          key={index}
          src={src}
          width={300}
          height={300}
          alt={`Фото ${filters} ${index + 1}`}
          className={css.images}
          onClick={() => open(src)}
        />
      ))}
    </div>
  );
}

export default GalleryImage;
