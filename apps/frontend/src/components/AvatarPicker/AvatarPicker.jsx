import { useRef, useState } from "react";

import { useFormikContext } from "formik";

import css from "./AvatarPicker.module.css";
import Button from "../ui/Button/Button";

import { useAuth } from "../../context/AuthContext";

import previewAvatar from "/img/user-man.png";
import PreviewAvatarMan from "/img/user-man.png";
import PreviewAvatarWomen from "/img/user-women.png";

export const AvatarPicker = ({ name, styles, buttonStyles }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // STATE

  const { user, fetchUser, patchUser } = useAuth();

  const { avatar, sex } = user;

  const { setFieldValue } = useFormikContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFieldValue(name, file);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("avatar", file);

        const res = await patchUser(formData);

        // ✅ Оновити user у контексті, якщо потрібно
        if (res) {
          await fetchUser(); // або fetchUser() з AuthContext
        }
      } catch (err) {
        console.error("❌ Avatar update failed:", err);
        setError("Не вдалося оновити аватар");
      }
    }
  };

  return (
    <div className={css.avatar_picker_wrapper} style={{ ...styles }}>
      <div className={css.preview_avatar}>
        <img
          src={
            avatar ||
            (sex == "Man" && PreviewAvatarMan) ||
            (sex == "Woman" && PreviewAvatarWomen) ||
            previewAvatar
          }
          alt="Preview avatar"
          width={132}
          height={132}
          className={css.avatar}
        />
        <Button
          type="button"
          alternative={true}
          styles={{
            maxWidth: 218,
            zIndex: 1,
            position: "relative",
            ...(buttonStyles || {}),
          }}
          action={handleClick}
        >
          Choose photo
        </Button>
      </div>
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/*"
        name={name}
        onChange={handleFileChange}
        className={css.custom_avatar_input}
      />
    </div>
  );
};
