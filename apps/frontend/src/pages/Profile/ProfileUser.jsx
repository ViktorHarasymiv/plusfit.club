import css from "./Style.module.css";

import { useAuth } from "../../context/AuthContext";
import ProfileTabs from "./ProfileTabs/ProfileTabs";

function ProfileUser() {
  return (
    <div className={css.profile_wrapper}>
      <ProfileTabs />
    </div>
  );
}

export default ProfileUser;
