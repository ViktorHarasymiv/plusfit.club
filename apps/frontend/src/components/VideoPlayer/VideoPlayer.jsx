import React from "react";

import css from "./Style.module.css";

const VideoPlayer = ({ file }) => (
  <video
    className={css.wrapper}
    width="100%"
    height="100%"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src={file} type="video/mp4" />
    Ваш браузер не підтримує відео.
  </video>
);

export default VideoPlayer;
