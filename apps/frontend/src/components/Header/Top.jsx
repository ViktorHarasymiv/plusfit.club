import style from "./Header.module.css";

import { SlLocationPin } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { BsTelephoneForward } from "react-icons/bs";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useMainConfigStore } from "../../store/mainStore";
import Loader from "../ui/Loader/Loader";

function Top() {
  const { config } = useMainConfigStore();

  if (!config) return <Loader />;

  const { address, email, phone, media } = config.data;

  return (
    <div className={style.header_top_wrapper}>
      <div className="container">
        <div className={style.header_content_wrapper}>
          <div className={style.contact_bar}>
            <ul className={style.contact_bar_list}>
              <li className={style.bar_list_item}>
                <SlLocationPin />
                <a href={`${address.url}`} target="_blank">
                  {address.street}
                </a>
              </li>
              <li className={style.bar_list_item}>
                <TiMessages />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li className={style.bar_list_item}>
                <BsTelephoneForward />
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
            </ul>
          </div>
          <div className={style.social_content_wrapper}>
            <h5 className="h5">Follow Us:</h5>
            <ul className={style.social_bar}>
              <li>
                <a href={media.facebook} target="_blank">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href={media.instagram} target="_blank">
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
