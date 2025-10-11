import React from "react";

import clsx from "clsx";

import css from "./Style.module.css";

function GalleryTabsButton({ data, filter, setFiter, page }) {
  if (!data) return;

  return (
    <div className={css.button_wrapper}>
      {data.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => setFiter(item)}
            className={clsx(css.button, filter === item && css.active)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default GalleryTabsButton;
