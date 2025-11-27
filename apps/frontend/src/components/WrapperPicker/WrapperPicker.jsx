import { useAuth } from "../../context/AuthContext";

import { useRef, useState } from "react";

import css from "./Style.module.css";
import Button from "../ui/Button/Button";

function WrapperPicker({ name }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // STATE

  const { user, fetchUser, patchUser } = useAuth();

  const { wrapper } = user;

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
        formData.append("wrapper", file);

        const res = await patchUser(formData);

        if (res) {
          await fetchUser();
        }
      } catch (err) {
        console.error("❌ Wrapper update failed:", err);
        setError("Не вдалося оновити білборд");
      }
    }
  };

  return (
    <div className={css.background_tile}>
      <img
        src={
          wrapper ||
          previewUrl ||
          "https://res.cloudinary.com/dcmbg0k5a/image/upload/v1760370985/zrgc6rjo13swdddjsivi.jpg"
        }
        alt=""
        className={css.background}
      />
      <div className={css.custom_avatar_wrapper}>
        <input
          ref={inputRef}
          id="wrapper"
          type="file"
          accept="image/*"
          name={name}
          onChange={handleFileChange}
          className={css.custom_input_wrapper}
        />

        <button onClick={handleClick} className={css.upload}>
          Choose a cover
        </button>
      </div>
    </div>
  );
}

export default WrapperPicker;
