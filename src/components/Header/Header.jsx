import React from "react";
import Top from "./Top";
import General from "./General";

// import { useScrollY } from "../../hooks/useScrollY";

export default function Header() {
  //   const scrollY = useScrollY();

  return (
    <header>
      <Top></Top>
      <General></General>
    </header>
  );
}
