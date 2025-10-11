import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import clsx from "clsx";

import style from "./Header.module.css";

import logoLight from "/logo/logoLight.png";
import logoDark from "/logo/logoDark.png";

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
                      <NavLink to={"/offer"} style={{ pointerEvents: "none" }}>
                        Пропозиції <MdKeyboardArrowDown />
                      </NavLink>
                      <ul className={style.dropmenu}>
                        <li>
                          <NavLink
                            to="offer/gym"
                            className={style.dropdown_item}
                          >
                            Тренажерний зал
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/offer/massage"
                            className={style.dropdown_item}
                          >
                            Масаж
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/offer/rehabilitation"
                            className={style.dropdown_item}
                          >
                            Реабілітація
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/offer/yoga"
                            className={style.dropdown_item}
                          >
                            Йога
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/offer/kids"
                            className={style.dropdown_item}
                          >
                            Дитячі танці
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/offer/endosphere"
                            className={style.dropdown_item}
                          >
                            Сфератерапія
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to={"/price"} style={{ pointerEvents: "none" }}>
                        Ціни <MdKeyboardArrowDown />
                      </NavLink>
                      <ul className={style.dropmenu}>
                        <li>
                          <NavLink
                            to="price/gym"
                            className={style.dropdown_item}
                          >
                            Тренажерний зал
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="price/massage"
                            className={style.dropdown_item}
                          >
                            Масаж
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="price/rehabilitation"
                            className={style.dropdown_item}
                          >
                            Реабілітація
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="price/yoga"
                            className={style.dropdown_item}
                          >
                            Йога
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="price/kids"
                            className={style.dropdown_item}
                          >
                            Дитячі танці
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="price/endosphere"
                            className={style.dropdown_item}
                          >
                            Сфератерапія
                          </NavLink>
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
