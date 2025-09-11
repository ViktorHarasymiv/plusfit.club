import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { MdAdsClick } from "react-icons/md";

import css from "./SideNavigation.module.css";

export default function SideNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={css.panel}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={css.show_button}
      >
        <span style={{ color: isOpen ? "var(--accent-color)" : "" }}>
          <MdAdsClick style={{ marginRight: "6px" }} />
          {isOpen ? "Скрити меню" : "Показати меню"}
        </span>
      </button>

      <nav
        className={css.panel_wrapper}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <NavLink to="/offer">Головна</NavLink>
        <NavLink to="/offer/rehabilitation">
          <MdKeyboardDoubleArrowRight /> <span>Реабілітація</span>
        </NavLink>
        <NavLink to="/offer/massage">
          <MdKeyboardDoubleArrowRight /> <span>Масаж</span>
        </NavLink>
        <NavLink to="/offer/endosphere">
          <MdKeyboardDoubleArrowRight /> <span>Ендосфера</span>
        </NavLink>
        <NavLink to="/offer/group">
          <MdKeyboardDoubleArrowRight /> <span>Групові тренування</span>
        </NavLink>
        <NavLink to="/offer/kids">
          <MdKeyboardDoubleArrowRight />
          <span>Дитячі тренування</span>
        </NavLink>
      </nav>
    </div>
  );
}
