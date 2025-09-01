import React from "react";

import Hero from "../../components/Hero/Hero";
import Preference from "../../components/Preference/Preference";

import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function Home() {
  const width = useWindowWidth();

  return (
    <main>
      <Hero></Hero>
      {width > 991.98 && <Preference />}
    </main>
  );
}
