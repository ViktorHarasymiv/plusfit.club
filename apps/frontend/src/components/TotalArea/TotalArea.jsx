import React from "react";
import NumberScroller from "number-scroller";

import Icon from "../ui/Icon/Icon";

import css from "./Style.module.css";

function TotalArea() {
  const data = [
    {
      id: 0,
      icon: "member",
      title: "Member",
      count: 21342,
    },
    {
      id: 1,
      icon: "gym",
      title: "Equipment",
      count: 38,
    },
    {
      id: 2,
      icon: "muscle",
      title: "Trainer",
      count: 8,
    },
    {
      id: 3,
      icon: "medal",
      title: "Awards",
      count: 4,
    },
  ];
  return (
    <section className={css.total_area_section}>
      <div className="container">
        <ul className={css.list}>
          {data.map(({ count, title, icon }, index) => {
            return (
              <li key={index} className={css.item}>
                <div className={css.icon_box}>
                  <Icon name={`icon-${icon}`} color={"var(--white)"} />
                </div>
                <div className={css.content_wrapper}>
                  <span className={css.count_box}>
                    <NumberScroller step={127} to={count} timeout={1000} />
                  </span>
                  <h6>+ {title}</h6>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default TotalArea;
