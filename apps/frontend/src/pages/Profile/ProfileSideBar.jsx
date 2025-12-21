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
            <MdDoubleArrow /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/workout"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> My workout
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/history"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> My subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/setup"}
            className={({ isActive }) =>
              clsx(css.nav_link, isActive && css.active)
            }
          >
            <MdDoubleArrow /> Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileSideBar;
