import React from "react";

import css from "./Style.module.css";

function TileTitle({ title }) {
  return <h5 className={css.title}>{title}</h5>;
}

export default TileTitle;
