import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import clsx from "clsx";

import style from "./Header.module.css";

import logoLight from "/logo/logoLight.png";
import logoDark from "/logo/logoDark.png";

import { useScrollY } from "../../hooks/useScrollY";

import { MdKeyboardArrowDown } from "react-icons/md";

import MobileMenu from "../MobileMenu/MobileMenu";
import AuthTile from "../AuthTile/AuthTile";
import Logo from "../Logo/Logo";

export default function General({ resizeWidth }) {
  const currentHeight = useRef(null);

  const scrollY = useScrollY();

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
              <Logo isInView={isScroll} />
            </Link>
            {resizeWidth > 991.98 && (
              <div className={style.navbar}>
                <ul className={style.navbar_list}>
                  <li className={style.navbar_item}>
                    <NavLink to="/">
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to={"/offer"} style={{ pointerEvents: "none" }}>
                      Offer <MdKeyboardArrowDown />
                    </NavLink>
                    <ul className={style.dropmenu}>
                      <li>
                        <NavLink to="offer/gym" className={style.dropdown_item}>
                          Gym
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/offer/massage"
                          className={style.dropdown_item}
                        >
                          Massage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/offer/rehabilitation"
                          className={style.dropdown_item}
                        >
                          Rehabilitation
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/offer/yoga"
                          className={style.dropdown_item}
                        >
                          Yoga
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to={"/price"} style={{ pointerEvents: "none" }}>
                      Price <MdKeyboardArrowDown />
                    </NavLink>
                    <ul className={style.dropmenu}>
                      <li>
                        <NavLink
                          to="price/Gym&Fitness"
                          className={style.dropdown_item}
                        >
                          Gym
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="price/massage"
                          className={style.dropdown_item}
                        >
                          Massage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="price/rehabilitation"
                          className={style.dropdown_item}
                        >
                          Rehabilitation
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="price/yoga"
                          className={style.dropdown_item}
                        >
                          Yoga
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/gallery">
                      <span>Gallery</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/about">
                      <span>About Us</span>
                    </NavLink>
                  </li>
                  <li className={style.navbar_item}>
                    <NavLink to="/contacts">
                      <span>Contacts</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
            {resizeWidth > 991.98 && (
              <div className={style.action_bar_wrapper}>
                {/* {resizeWidth > 1199.98 && <Search />} */}
                <AuthTile isScroll={isScroll} />
              </div>
            )}
            {resizeWidth < 991.98 && <MobileMenu isScroll={isScroll} />}
          </nav>
        </div>
      </div>
    </>
  );
}
