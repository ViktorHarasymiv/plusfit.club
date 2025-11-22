import React from "react";
import { useLocation, Link } from "react-router-dom";

import css from "./NavigationContext.module.css";

import { MdOutlineDoubleArrow } from "react-icons/md";

export default function NavigationContext() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={css.wrapper} style={{ background: "url(/img/event.jpg)" }}>
      <div className="container">
        <div className={css.content_wrapper}>
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            const Name = name.replaceAll("-", " ");
            return (
              isLast && (
                <h1 key={index} className={css.title}>
                  {decodeURIComponent(Name)}
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
              const Name = name.replaceAll("-", " ");
              return (
                <li key={routeTo}>
                  <MdOutlineDoubleArrow />
                  {isLast ? (
                    <span style={{ color: "var(--accent-color)" }}>
                      {decodeURIComponent(Name)}
                    </span>
                  ) : (
                    <Link to={routeTo}>{decodeURIComponent(Name)}</Link>
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
