import { useAuth } from "../../context/AuthContext";

import css from "./Style.module.css";
import WrapperPicker from "../../components/WrapperPicker/WrapperPicker";

import previewAvatar from "/img/user-man.png";
import PreviewAvatarMan from "/img/user-man.png";
import PreviewAvatarWomen from "/img/user-women.png";

import UserInfoBar from "./UserInfoBar/UserInfoBar";

function ProfileDashboard() {
  const { user } = useAuth();

  const { avatar, name, email, sex } = user;

  return (
    <div className={css.dashboard_wrapper}>
      <div className={css.user_wrapper}>
        <div className={css.background_tile}>
          <WrapperPicker name={"wrapper"} />
        </div>
        <div className={css.user_info_wrapper}>
          <img
            src={
              avatar ||
              (sex == "Man" && PreviewAvatarMan) ||
              (sex == "Woman" && PreviewAvatarWomen) ||
              previewAvatar
            }
            alt="User avatar"
            width={160}
            height={160}
            className={css.avatar}
          />
          <div className={css.info_panel_wrapper}>
            <div>
              <p className={css.user_name}>{name}</p>
              <p className={css.user_email}>{email}</p>
            </div>
            <UserInfoBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
