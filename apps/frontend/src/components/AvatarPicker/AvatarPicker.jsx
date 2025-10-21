"use client";

import { useRef, useState } from "react";

import { useFormikContext } from "formik";

import css from "./AvatarPicker.module.css";
import Button from "../ui/Button/Button";

import avatar from "/img/avatarPreview.png";
import { useAuth } from "../../context/AuthContext";

export const AvatarPicker = ({
  name,
  initialPhoto,
  styles,
  isContent,
  buttonStyles,
}) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const { setFieldValue, errors, touched } = useFormikContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
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
    }
  };

  // STATE

  const { user } = useAuth();

  return (
    <div className={css.avatar_picker_wrapper} style={{ ...styles }}>
      <div className={css.preview_avatar}>
        <img
          src={previewUrl || initialPhoto || user.avatar}
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
          Оберіть фото
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

      {isContent && (
        <div className={css.user_info_wrapper}>
          <div className={css.content_wrapper}>
            <p className={css.user_name}>{user?.name}</p>
            <p className={css.user_email}>{user?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};
