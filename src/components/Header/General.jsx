import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import style from "./Header.module.css";

import logoLight from "../../assets/logo/logoLight.PNG";

import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

export default function General() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className={style.header_general_wrapper}>
        <div className="container">
          <nav className={style.navbar_wrapper}>
            <Link to="/" className="logo_header">
              <img
                src={logoLight}
                alt="PlusFit"
                width={140}
                height={70}
                className="logo"
              />
              <span className="motivation_text">
                Ви - серце, нашого залу! <br /> Без Вас, це просто приміщення{" "}
                <FaHeart className="heart_ico" />
              </span>
            </Link>
            <div className={style.action_bar_wrapper}>
              <div className={style.navbar}>
                <ul className={style.navbar_list}>
                  <li className={style.navbar_item}>
                    <NavLink to="/">
                      <span>Головна</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <span>Пропозиції</span>
                    <MdKeyboardArrowDown />
                    <ul className={style.dropmenu}>
                      <li className={style.dropdown_item}>
                        <NavLink to="/rehabilitation">Реабілітація</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/massage">Масаж</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/endosphere">Ендосфера</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/group">Групові тренування</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/children">Дитячі танці</NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={style.navbar_item}>
                    <span>Ціни</span>
                    <MdKeyboardArrowDown />
                    <ul className={style.dropmenu}>
                      <li className={style.dropdown_item}>
                        <NavLink to="/subscription">Абонемент</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/massage">Масаж</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/rehabilitation">Реабілітація</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/endosphere">Сфератерапія</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/group">Групові тренування</NavLink>
                      </li>
                      <li className={style.dropdown_item}>
                        <NavLink to="/children">Дитячі танці</NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/about">
                      <span>Про Нас</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/gallery">
                      <span>Галерея</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/contacts">
                      <span>Контакти</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Button type={"button"} action={setModalOpen}>
                {"Отримати пропозицію"}
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Акції та знижки</h2>
        <p>Дякую за увагу !</p>
      </Modal>
    </>
  );
}
