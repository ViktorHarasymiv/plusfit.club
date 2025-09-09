import style from "./Header.module.css";

import { SlLocationPin } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { BsTelephoneForward } from "react-icons/bs";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Top() {
  return (
    <div className={style.header_top_wrapper}>
      <div className="container">
        <div className={style.header_content_wrapper}>
          <div className={style.contact_bar}>
            <ul className={style.contact_bar_list}>
              <li className={style.bar_list_item}>
                <SlLocationPin />
                <a
                  href="https://maps.app.goo.gl/ASMqpRVMyCiMFmyp9"
                  target="_blank"
                >
                  Гончарська, 5Б, Броди, 80600
                </a>
              </li>
              <li className={style.bar_list_item}>
                <TiMessages />
                <a href="mailto:info.plusfitclub@gmail.com">
                  info.plusfitclub@gmail.com
                </a>
              </li>
              <li className={style.bar_list_item}>
                <BsTelephoneForward />
                <a href="tel:+380933144087">+380 93 314 4087</a>
              </li>
            </ul>
          </div>
          <div className={style.social_content_wrapper}>
            <h5 className="h5">Follow Us:</h5>
            <ul className={style.social_bar}>
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
        </div>
      </div>
    </div>
  );
}

export default Top;
