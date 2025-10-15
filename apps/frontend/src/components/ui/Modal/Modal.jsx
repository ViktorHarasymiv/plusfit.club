import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import style from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  children,
  overlayStyle,
  styles,
}) {
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

  useEffect(() => {
    if (isOpen) {
      document.querySelector("html").classList.add("lock");
    } else {
      document.querySelector("html").classList.remove("lock");
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => onClose()}
      className={style.modal_overlay}
      style={{ ...overlayStyle }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={style.modal_content}
        style={{ ...styles }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
