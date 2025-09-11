import React from "react";
import { useLocation, Link } from "react-router-dom";

import css from "./NavigationContext.module.css";

import { MdOutlineDoubleArrow } from "react-icons/md";

export default function NavigationContext() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className={css.wrapper}
      style={{ background: "url(/img/navBarBg.jpg)" }}
    >
      <div className="container">
        <div className={css.content_wrapper}>
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            return (
              isLast && (
                <h1 key={index} className={css.title}>
                  {name}
                </h1>
              )
            );
          })}
          <ul className={css.list}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
              const isLast = index === pathnames.length - 1;
              return (
                <li key={routeTo}>
                  <MdOutlineDoubleArrow />
                  {isLast ? (
                    <span style={{ color: "var(--accent-color)" }}>{name}</span>
                  ) : (
                    <Link to={routeTo}>{name}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
