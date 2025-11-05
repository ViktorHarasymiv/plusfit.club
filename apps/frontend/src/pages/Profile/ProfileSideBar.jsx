import clsx from "clsx";

import { NavLink } from "react-router-dom";

import css from "./Style.module.css";
import { MdDoubleArrow } from "react-icons/md";

function ProfileSideBar() {
  return (
    <nav className={css.side_bar}>
      <ul className={css.side_bar_list}>
        <li>
          <NavLink
            to={"/profile/user"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> Мій кабінет
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/history"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> Мої абонементи
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/setup"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> Налаштування
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileSideBar;
