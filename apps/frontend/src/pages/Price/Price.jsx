import React from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import { Outlet } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

export default function Price() {
  return (
    <main>
      <NavigationContext />
      <section>
        <Outlet />
      </section>
    </main>
  );
}
