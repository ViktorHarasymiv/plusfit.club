import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

import css from "./Style.module.css";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import Content from "./Content";

function Policy() {
  return (
    <main>
      <NavigationContext />
      <Content />
    </main>
  );
}

export default Policy;
