import React, { useEffect, useState } from "react";

import { MdOutlineSportsGymnastics } from "react-icons/md";

import style from "./MobileMenu.module.css";
import Modal from "../ui/Modal/Modal";

const buttonStyle = {
  position: "absolute",

  top: "10px",
  right: "10px",
};

const activeStyle = {
  color: "var(--accent-color)",
  transform: "rotateY(-180deg)",
};

const accentColor = {
  color: "var(--accent-color)",
};

const mobileOverlayStyle = {
  justifyContent: "end",
};

const mobilePanelStyle = {
  opacity: "1",
  width: "80vw",
  maxHeight: "100vh",
  borderRadius: "0",
  background: "rgba(0,0,0, 0.6)",
};

export default function MobileMenu() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.querySelector("html").classList.add("lock");
    } else {
      document.querySelector("html").classList.remove("lock");
    }
  }, [isModalOpen]);

  return (
    <>
      {/* OPEN MENU */}

      <button
        onClick={() => setModalOpen(true)}
        type="button"
        className={style.icon_wrapper}
      >
        <MdOutlineSportsGymnastics
          className={style.menu_icon}
          style={isModalOpen && { color: "var(--accent-color)" }}
        />
        <span style={isModalOpen ? { ...activeStyle } : undefined}>MENU</span>
      </button>

      {/* MENU */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        overlayStyle={mobileOverlayStyle}
        styles={mobilePanelStyle}
      >
        Мобільне вікно
        {/* CLOSE MENU */}
        <button
          onClick={() => setModalOpen(false)}
          type="button"
          className={style.icon_wrapper}
          style={isModalOpen ? { ...buttonStyle } : undefined}
        >
          <MdOutlineSportsGymnastics
            className={style.menu_icon}
            style={isModalOpen && { ...activeStyle }}
          />
          <span style={isModalOpen ? { ...accentColor } : undefined}>ESC</span>
        </button>
      </Modal>
    </>
  );
}
