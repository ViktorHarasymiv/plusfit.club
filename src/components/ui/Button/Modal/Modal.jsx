import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import style from "./Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div onClick={() => onClose()} className={style.modal_overlay}>
      <div onClick={(e) => e.stopPropagation()} className={style.modal_content}>
        <button className={style.close_btn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
