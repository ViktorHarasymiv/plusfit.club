import React, { useEffect, useState } from "react";
import { useFullscreenStore } from "../../store/fullscreenStore";

import css from "./Style.module.css";

function FullscreenViewer() {
  const { isOpen, imageSrc, close } = useFullscreenStore();

  if (!isOpen || !imageSrc) return null;

  return (
    <div className={css.fullscreen_overlay} onClick={close}>
      <img src={imageSrc} alt="" className={css.fullscreen_image} />
    </div>
  );
}

export default FullscreenViewer;
