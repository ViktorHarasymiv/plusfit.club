import React from "react";
import Top from "./Top";
import General from "./General";

// import { useScrollY } from "../../hooks/useScrollY";

import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function Header() {
  //   const scrollY = useScrollY();
  const width = useWindowWidth();

  return (
    <header>
      {width > 991.98 && <Top />}
      <General resizeWidth={width}></General>
    </header>
  );
}
