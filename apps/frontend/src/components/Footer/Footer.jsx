import { Link, NavLink } from "react-router-dom";

import style from "./Footer.module.css";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { TiArrowSortedDown } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { BsTelephoneForward } from "react-icons/bs";

import Button from "../ui/Button/Button";
import TitleDecor from "../ui/TitleDecor/TitleDecor";

import { useWindowWidth } from "../../hooks/useWindowWidth";
import Logo from "../Logo/Logo";

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
                  <Link to="/" className=" footer_logo">
                    <Logo />
                  </Link>
                  <p className={style.info_about_text}>
                    Training becomes an art when you train not only for
                    strength, but also for grace. Conquer new heights with us!
                  </p>
                </div>
                <div className={style.contact_bar}>
                  <ul className={style.contact_bar_list}>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <SlLocationPin />
                      </div>
                      <a href="#" target="_blank">
                        Ventura Boulevard, CA 91604
                      </a>
                    </li>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <TiMessages />
                      </div>
                      <a href="#">info.ironman@gmail.com</a>
                    </li>
                    <li className={style.bar_list_item}>
                      <div className={style.icon_box}>
                        <BsTelephoneForward />
                      </div>
                      <a href="tel:+4878998758">+48 789 987 58</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={style.navigation_block}>
                <nav>
                  <h4 className={style.navigation_title}>
                    Navigation <TitleDecor />
                  </h4>
                  <ul className={style.navbar_list}>
                    <li className={style.navbar_item}>
                      <NavLink to="/">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Home</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <a href="#tarife">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Subscription</span>
                      </a>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/about">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>About Us</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/gallery">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Gallery</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/contacts">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Contacts</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <nav>
                  <h4 className={style.navigation_title}>
                    Offers <TitleDecor />
                  </h4>
                  <ul className={style.navbar_list}>
                    <li className={style.navbar_item}>
                      <NavLink to="offer/gym">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Gym / Fitness</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/offer/massage">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Massage</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="/offer/rehabilitation">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Rehabilitation</span>
                      </NavLink>
                    </li>
                    <li className={style.navbar_item}>
                      <NavLink to="offer/yoga">
                        <TiArrowSortedDown className={style.icon_route} />
                        <span>Yoga</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <nav className={style.news_block}>
                  <h4 className={style.navigation_title}>
                    News <TitleDecor />
                  </h4>
                  <p className={style.news_text}>
                    Stay tuned: we have something special for those who are not
                    afraid to set big goals.
                  </p>
                  <Button type={"button"} styles={styleObj}>
                    {"Go to news"}
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
                <span className="accent_text non_full_width">IRON MASS</span>{" "}
                All rights reserved.
              </div>
            </div>
            {width > 576.98 && (
              <ul className={style.footer_sociial}>
                <li>
                  <a
                    className="icon_block"
                    href="#"
                    title="Facebook"
                    target="_blank"
                  >
                    <FaFacebookF className="icon footer_icon" />
                  </a>
                </li>
                <li>
                  <a
                    className="icon_block"
                    href="#"
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
