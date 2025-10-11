import { Outlet, useLocation } from "react-router-dom";

import NavigationContext from "../../components/NavigationContext/NavigationContext";

import css from "./Style.module.css";

import Trainer from "../../components/Trainers/Trainer";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function TeamLayout() {
  const location = useLocation();
  const isRoot = location.pathname === "/team";

  return (
    <main>
      <NavigationContext />
      <>
        {isRoot && (
          <div className={css.layout_wrapper}>
            <SectionTitle title={"Our team"} about={"Наша команда"} />
            <Trainer />
          </div>
        )}
        <Outlet />
      </>
    </main>
  );
}

export default TeamLayout;
