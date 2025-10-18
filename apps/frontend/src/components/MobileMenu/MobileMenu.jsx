import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import clsx from "clsx";

import { MdOutlineSportsGymnastics } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import { GoHomeFill } from "react-icons/go";
import { MdOutlineWidgets } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";

import { FaPhoneAlt } from "react-icons/fa";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { FaCalendarAlt } from "react-icons/fa";

import { FaBusinessTime } from "react-icons/fa";

import style from "./MobileMenu.module.css";
import css from "../Header/Header.module.css";

import Modal from "../ui/Modal/Modal";
import AuthTile from "../AuthTile/AuthTile";

const buttonStyle = {
  position: "absolute",

  top: "15px",
  right: "15px",
};

const activeStyle = {
  color: "var(--accent-color)",
  transform: "rotateY(-180deg)",
};

const mobileOverlayStyle = {
  justifyContent: "end",
};

const mobilePanelStyle = {
  opacity: "1",
  width: "80vw",
  maxHeight: "100%",
  height: "100%",
  borderRadius: "0",
  background: "rgba(0,0,0, 0.6)",
};

export default function MobileMenu({ isScroll }) {
  const location = useLocation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isdropMenu, setDropMenu] = useState(false);
  const [isdropMenuPrice, setDropMenuPrice] = useState(false);
  const [isWorkTimeOpen, setWorkTimeOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.querySelector("html").classList.add("lock");
    } else {
      document.querySelector("html").classList.remove("lock");
    }
  }, [isModalOpen]);

  useEffect(() => {
    setModalOpen(false);
  }, [location]);

  const controllDropMenuPromo = () => {
    setDropMenu((prev) => !prev);
    setDropMenuPrice(false);
  };

  const controllDropMenuPrice = () => {
    setDropMenuPrice((prev) => !prev);
    setDropMenu(false);
  };

  const workTimeModalStyle = {
    width: "100%",
    height: "250px",
    background: "rgba(0,0,0, 0.5)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "20px",
    color: "var(--white)",
  };

  return (
    <>
      {/* OPEN MENU */}

      <button
        onClick={() => setModalOpen(true)}
        type="button"
        className={clsx(style.icon_wrapper, {
          [style.scrolled]: isScroll,
        })}
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
        <div className={style.content_wrapper}>
          {/* MENU */}
          <div className={style.action_bar_wrapper}>
            <div className={style.navbar}>
              <ul className={style.navbar_list}>
                <li className={style.navbar_item}>
                  <NavLink to="/">
                    <GoHomeFill />
                    <span>Головна</span>
                  </NavLink>
                </li>
                <li
                  onClick={controllDropMenuPromo}
                  className={style.navbar_item}
                >
                  <MdOutlineWidgets />
                  <span>Пропозиції</span>
                  <MdKeyboardArrowDown />
                  {isdropMenu && (
                    <ul className={style.dropmenu}>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/gym">Тренажерний зал</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/massage">Масаж</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/rehabilitation">
                          Реабілітація
                        </NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/yoga">Йога</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/kids">Дитячі танці</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/offer/endosphere">Сфератерапія</NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={controllDropMenuPrice}
                  className={style.navbar_item}
                >
                  <MdLocalOffer />
                  <span>Ціни</span>
                  <MdKeyboardArrowDown />
                  {isdropMenuPrice && (
                    <ul className={style.dropmenu}>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/gym">Тренажерний зал</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/massage">Масаж</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/rehabilitation">
                          Реабілітація
                        </NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/yoga">Йога</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/children">Дитячі танці</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="price/endosphere">Сфератерапія</NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className={style.navbar_item}>
                  <NavLink to="/gallery">
                    <GrGallery />
                    <span>Галерея</span>
                  </NavLink>
                </li>
                <li className={style.navbar_item}>
                  <NavLink to="/about">
                    <IoDocumentText />
                    <span>Про Нас</span>
                  </NavLink>
                </li>
                <li className={style.navbar_item}>
                  <NavLink to="/contacts">
                    <IoMdContacts />
                    <span>Контакти</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* MENU */}
          <footer className={style.footer}>
            <div className={style.auth_wrapper}>
              <AuthTile />
            </div>
            <div className={style.footer_action}>
              {/* SOCIAL */}
              <div className={style.footer_social}>
                <ul className={css.social_bar}>
                  <li>
                    <a
                      href="https://www.facebook.com/plusfit.brody.2025"
                      target="_blank"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/plusfit.brody/"
                      target="_blank"
                    >
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
              {/* PHONE */}
              <div className={style.footer_phonel}>
                <div className="dws">
                  <a href="tel:+380933144087">
                    <div className="pulse">
                      <div className="bloc"></div>
                      <div className="phone">
                        <FaPhoneAlt />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className={style.footer_copyright}>
              &copy; Copyright 2025{" "}
              <span className="accent_text non_full_width">PLUSFIT BRODY</span>{" "}
              <br />
              Усі права захищено.
            </div>
          </footer>
        </div>
        {/* ACTION MENU */}
        <>
          <div className={style.work_time_wrapper}>
            <h5 onClick={() => setWorkTimeOpen(true)}>
              <FaBusinessTime /> Режим роботи
            </h5>
            {/* WORK TIME MODAL */}
            <Modal
              isOpen={isWorkTimeOpen}
              onClose={() => setWorkTimeOpen(false)}
              styles={workTimeModalStyle}
            >
              <div className={style.work_time_block}>
                <h6>
                  <FaCalendarAlt />
                  Режим роботи
                </h6>
                <ul className={style.work_time_list}>
                  <li>
                    <span>Пн - Пт</span>
                    9:00 - 21:00
                  </li>
                  <li>
                    <span>Субота</span>
                    10:00 - 17:00
                  </li>
                  <li>
                    <span>Неділя</span>
                    10:00 - 15:00
                  </li>
                </ul>
              </div>
            </Modal>
          </div>
          {/* ESC */}
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
            <span>ESC</span>
          </button>
        </>
      </Modal>
    </>
  );
}
