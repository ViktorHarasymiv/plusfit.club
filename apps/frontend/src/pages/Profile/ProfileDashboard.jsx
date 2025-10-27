import React from "react";
import { useAuth } from "../../context/AuthContext";

import css from "./Style.module.css";
import WrapperPicker from "../../components/WrapperPicker/WrapperPicker";

function ProfileDashboard() {
  const { user } = useAuth();

  console.log(user);

  const { avatar, name, goal } = user;

  return (
    <div className={css.dashboard_wrapper}>
      <div className={css.user_wrapper}>
        <div className={css.background_tile}>
          <WrapperPicker name={"wrapper"} />
        </div>
        <div className={css.user_info_wrapper}>
          <img
            src={avatar}
            alt="User avatar"
            width={160}
            height={160}
            className={css.avatar}
          />
          <div className={css.info_panel_wrapper}>
            <h4 className={css.user_name}>{name}</h4>
            <h5>{goal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
