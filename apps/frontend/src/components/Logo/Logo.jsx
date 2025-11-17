import React from "react";

import css from "./Style.module.css";

function Logo({ isInView }) {
  return (
    <div
      className={css.logo}
      style={{ color: isInView ? "var(--dark)" : null }}
    >
      <span style={{ color: isInView ? "var(--dark)" : null }}>IRON</span>
      MASS
    </div>
  );
}

export default Logo;
