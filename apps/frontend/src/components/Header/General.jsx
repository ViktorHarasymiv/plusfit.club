import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import clsx from "clsx";

import style from "./Header.module.css";

import logoLight from "../../assets/logo/logoLight.PNG";
import logoDark from "../../assets/logo/logoDark.PNG";

import { useScrollY } from "../../hooks/useScrollY";

import { MdKeyboardArrowDown } from "react-icons/md";

import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

import MobileMenu from "../MobileMenu/MobileMenu";
import Search from "../Search/Search";

export default function General({ resizeWidth }) {
  const currentHeight = useRef(null);

  const scrollY = useScrollY();
  const [isModalOpen, setModalOpen] = useState(false);

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (!currentHeight.current) return;

    const rect = currentHeight.current.getBoundingClientRect();
    const blockHeight = rect.height;

    const shouldScroll = scrollY > blockHeight;

    setIsScroll((prev) => {
      if (prev !== shouldScroll) return shouldScroll;
      return prev;
    });
  }, [scrollY]);

  return (
    <>
      <div
        ref={currentHeight}
        className={clsx(style.header_general_wrapper, {
          [style.scrolled]: isScroll,
        })}
      >
        <div className="container">
          <nav className={style.navbar_wrapper}>
            <Link to="/" className={style.logo_header}>
              <img
                src={`${!isScroll ? logoLight : logoDark}`}
                alt="PlusFit"
                width={140}
                height={70}
                className="logo"
                title="Ви - серце, нашого залу ! Без Вас, це просто приміщення 💛💙"
              />
            </Link>
            {resizeWidth > 991.98 && (
              <div className={style.action_bar_wrapper}>
                <div className={style.navbar}>
                  <ul className={style.navbar_list}>
                    <li className={style.navbar_item}>
                      <NavLink to="/">
                        <span>Головна</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/offer">Пропозиції</NavLink>
                      <MdKeyboardArrowDown />
                      <ul className={style.dropmenu}>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer">Тренажерний зал</NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer/rehabilitation">
                            Реабілітація
                          </NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer/massage">Масаж</NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer/endosphere">Ендосфера</NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer/yoga">Йога</NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/offer/kids">Дитячі танці</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/price"> Ціни </NavLink>
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
                          <NavLink to="/yoga">Йога</NavLink>
                        </li>
                        <li className={style.dropdown_item}>
                          <NavLink to="/kids">Дитячі танці</NavLink>
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
                <Search />
                {resizeWidth > 1199.98 && (
                  <Button type={"button"} action={setModalOpen}>
                    {"Отримати пропозицію"}
                  </Button>
                )}
              </div>
            )}
            {resizeWidth < 991.98 && <MobileMenu isScroll={isScroll} />}
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
