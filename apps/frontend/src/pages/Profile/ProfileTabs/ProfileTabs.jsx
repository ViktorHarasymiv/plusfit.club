import { useState } from "react";

import css from "./Style.module.css";
import News from "./Tab/News";
import Recomendation from "./Tab/Recomendation";
import clsx from "clsx";
import MyReviews from "./Tab/MyReviews/MyReviews";

function ProfileTabs() {
  const [currentTab, setCurrentTab] = useState("News");

  const consoleTabs = [
    {
      id: 0,
      label: "News",
    },
    {
      id: 1,
      label: "Recommendations",
    },
    {
      id: 2,
      label: "My review",
    },
  ];

  return (
    <div className={css.console_wrapper}>
      <ul className={css.tab_list}>
        {consoleTabs.map(({ label }, index) => (
          <li
            key={index}
            className={clsx(css.tab, label === currentTab && css.active)}
            onClick={() => setCurrentTab(label)}
          >
            {label}
          </li>
        ))}
      </ul>
      <section className={css.tab_section}>
        {currentTab == "News" ? (
          <News />
        ) : currentTab == "Recommendations" ? (
          <Recomendation />
        ) : currentTab == "My review" ? (
          <MyReviews />
        ) : null}
      </section>
    </div>
  );
}

export default ProfileTabs;
