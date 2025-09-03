import React from "react";
import { Link, NavLink } from "react-router-dom";

import style from "./Footer.module.css";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import logoLight from "../../assets/logo/logoLight.PNG";
import { TiArrowSortedDown } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { BsTelephoneForward } from "react-icons/bs";

import Button from "../ui/Button/Button";
import TitleDecor from "../ui/TitleDecor/TitleDecor";

import { useWindowWidth } from "../../hooks/useWindowWidth";

const styleObj = {
  width: "100%",
  justifyContent: "center",
};

export default function Footer() {
  const width = useWindowWidth();
  return (
    <footer className={style.footer}>
      <div className={style.footer_content_wrapper}>
        <div className="container">
          <div className={style.footer_navbar_wrapper}>
            <ul className={style.footer_navbar_list}>
              <li className={style.info_block}>
                <div>
                  <Link to="/" className="logo_header footer_logo">
                    <img
                      src={logoLight}
                      alt="PLUSFIT CLUB"
                      width={150}
                      height={80}
                      className="logo"
                    />
                  </Link>
                  <p className={style.info_about_text}>
                    Тренування стає мистецтвом, коли тренуєшся не лише для сили,
                    а й для витонченості. Підкорюйте нові висоти разом з нами!
                  </p>
                </div>
                <div className={style.contact_bar}>
                  <ul className={style.contact_bar_list}>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <SlLocationPin />
                      </div>
                      <a
                        href="https://maps.app.goo.gl/ASMqpRVMyCiMFmyp9"
                        target="_blank"
                      >
                        Гончарська, 5Б, Броди, 80600
                      </a>
                    </li>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <TiMessages />
                      </div>
                      <a href="mailto:info.plusfitclub@gmail.com">
                        info.plusfitclub@gmail.com
                      </a>
                    </li>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <BsTelephoneForward />
                      </div>
                      <a href="tel:+380933144087">+380 93 314 4087</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={style.navigation_block}>
                <nav>
                  <h4 className={style.navigation_title}>
                    Навігація <TitleDecor />
                  </h4>
                  <ul className={style.navbar_list}>
                    <li className={style.navbar_item}>
                      <NavLink to="/">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Головна</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/subscription">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Абонемент</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/about">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Про Нас</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/gallery">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Галерея</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/contacts">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Контакти</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <nav>
                  <h4 className={style.navigation_title}>
                    Пропозиції <TitleDecor />
                  </h4>
                  <ul className={style.navbar_list}>
                    <li className={style.navbar_item}>
                      <NavLink to="/rehabilitation">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Реабілітація</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/massage">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Масаж</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/endosphere">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Ендосфера</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/group">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Групові тренування</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/children">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Дитячі танці</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <nav className={style.news_block}>
                  <h4 className={style.navigation_title}>
                    Новини <TitleDecor />
                  </h4>
                  <p className={style.news_text}>
                    Слідкуй за оновленнями: ми готуємо щось особливе для тих,
                    хто не боїться ставити собі великі цілі.
                  </p>
                  <Button type={"button"} styles={styleObj}>
                    {"Перейти до новин"}
                  </Button>
                </nav>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.footer_copyright_wrapper}>
        <div className="container">
          <div className={style.copyright_content_wrapper}>
            <div className={style.footer_copyright}>
              <div className="container">
                &copy; Copyright 2025{" "}
                <span className="accent_text non_full_width">
                  PLUSFIT BRODY
                </span>{" "}
                Усі права захищено.
              </div>
            </div>
            {width > 576.98 && (
              <ul className={style.footer_sociial}>
                <li>
                  <a
                    className="icon_block"
                    href="https://www.facebook.com/plusfit.brody.2025"
                    title="Facebook"
                    target="_blank"
                  >
                    <FaFacebookF className="icon footer_icon" />
                  </a>
                </li>
                <li>
                  <a
                    className="icon_block"
                    href="https://www.instagram.com/plusfit.brody/"
                    target="_blank"
                    title="Instagram"
                  >
                    <FaInstagram className="icon footer_icon" />
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
