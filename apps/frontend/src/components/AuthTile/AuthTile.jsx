import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModalStore } from "../../store/useAuthModalStore";

import { useNavigate } from "react-router-dom";

import css from "./Style.module.css";
import Button from "../ui/Button/Button";
import previewAvatar from "/img/avatarPreview.png";

function AuthTile() {
  const navigate = useNavigate();
  const { openSignUp, openSignIn } = useAuthModalStore();

  const { user, getLogout } = useAuth();

  const navigateProfile = () => {
    navigate("/profile");
  };

  return !user ? (
    <div className={css.auth_wrapper}>
      <Button
        type="button"
        action={openSignIn}
        styles={{ maxHeight: "34px", fontSize: "12px" }}
      >
        Вхід
      </Button>
      <Button
        type="button"
        action={openSignUp}
        styles={{ maxHeight: "34px", fontSize: "12px" }}
      >
        Реєстрація
      </Button>
    </div>
  ) : (
    <div className={css.user_wrapper}>
      <div className={css.user_tile}>
        <h34 className={css.user_name}>
          Привіт <br />
          {user?.name}
        </h34>
        <img
          src={user?.avatar || previewAvatar}
          alt="User avatar"
          width={34}
          height={34}
        />
      </div>
      <div className={css.auth_wrapper}>
        <Button
          type="button"
          action={navigateProfile}
          styles={{ maxHeight: "24px", fontSize: "11px" }}
        >
          Профіль
        </Button>
        <Button
          type="button"
          action={getLogout}
          styles={{ maxHeight: "24px", fontSize: "11px" }}
        >
          Вийти
        </Button>
      </div>
    </div>
  );
}

export default AuthTile;
