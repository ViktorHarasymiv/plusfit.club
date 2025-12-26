import css from "./Style.module.css";

import ProfileTabs from "./ProfileTabs/ProfileTabs";

function ProfileUser() {
  return (
    <div className={css.profile_wrapper}>
      <ProfileTabs />
    </div>
  );
}

export default ProfileUser;
