import React from "react";

import css from "./Style.module.css";

import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div className={css.overflow}>
      <PuffLoader
        color={"var(--accent-color)"}
        size={54}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
