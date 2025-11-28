import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModalStore } from "../../store/useAuthModalStore";

import { useNavigate } from "react-router-dom";

import css from "./Style.module.css";
import Button from "../ui/Button/Button";

import previewAvatar from "/img/user-man.png";
import PreviewAvatarMan from "/img/user-man.png";
import PreviewAvatarWomen from "/img/user-women.png";

const AuthTile = React.memo(function AuthTile({ isScroll }) {
  const navigate = useNavigate();
  const { openSignUp, openSignIn } = useAuthModalStore();

  const { user, getLogout } = useAuth();

  const navigateProfile = () => {
    navigate("/profile/user");
  };

  return !user ? (
    <div className={css.auth_wrapper}>
      <Button
        type="button"
        action={openSignIn}
        styles={{ maxHeight: "34px", fontSize: "12px" }}
      >
        Sign In
      </Button>
      <Button
        type="button"
        action={openSignUp}
        styles={{ maxHeight: "34px", fontSize: "12px" }}
      >
        Sign Up
      </Button>
    </div>
  ) : (
    <div className={css.user_wrapper}>
      <div className={css.user_tile}>
        <h3
          className={css.user_name}
          style={{ color: isScroll ? "var(--dark)" : "inherit" }}
        >
          {user?.name}
        </h3>
        <img
          src={
            user?.avatar ||
            (user?.sex == "Man" && PreviewAvatarMan) ||
            (user?.sex == "Woman" && PreviewAvatarWomen) ||
            previewAvatar
          }
          alt="User avatar"
          className={css.avatar}
          width={34}
          height={34}
        />
      </div>
      <div className={css.auth_wrapper}>
        <Button
          type="button"
          action={() => navigateProfile()}
          styles={{ maxHeight: "24px", fontSize: "11px" }}
        >
          Profile
        </Button>
        <Button
          type="button"
          action={getLogout}
          styles={{ maxHeight: "24px", fontSize: "11px" }}
        >
          Go Out
        </Button>
      </div>
    </div>
  );
});

export default AuthTile;
