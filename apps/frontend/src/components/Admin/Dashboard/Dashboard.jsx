import { useAuth } from "../../../context/AuthContext";

import Button from "../../ui/Button/Button";

import style from "./Dashboard.module.css";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <main
      className={style.dashboard}
      style={{ backgroundImage: "url(/img/background.jpg)" }}
    >
      <div className="container">
        <div className={style.dashboard_wrapper}>
          <h4 className={style.title}>ADMIN DASHBOAR</h4>
        </div>
      </div>
    </main>
  );
}
