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
      <div className="container">
        <>
          {isRoot && (
            <div className={css.layout_wrapper}>
              <SectionTitle
                title={"Наша команда"}
                about={"Ми тут, щоб бути поруч. З вами. Для вас."}
              />
              <Trainer />
            </div>
          )}
          <Outlet />
        </>
      </div>
    </main>
  );
}

export default TeamLayout;
