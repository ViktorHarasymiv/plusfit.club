import React from "react";

import css from "./Style.module.css";
import Icon from "../ui/Icon/Icon";
import MessageForm from "./MessageForm";

function ContactsTable() {
  const contactsList = [
    {
      id: 0,
      title: "Адреса",
      content: "м. Броди, 80600 Гончарська, 5Б",
      icon: "icon-map",
    },
    {
      id: 1,
      title: "Телефон",
      content: "+380 (93) 314 40 87",
      icon: "icon-phone-call",
    },
    {
      id: 2,
      title: "Пошта",
      content: "info.plusfitclub@gmail.com",
      icon: "icon-message",
    },
    {
      id: 3,
      title: "Графік",
      content: [
        "Пн-Пт 9:00 - 21:00",
        "Субота 10:00 - 17:00",
        "Неділя 10:00 - 15:00",
      ],
      icon: "icon-calendar",
    },
  ];
  return (
    <div>
      <ul className={css.wrapper_list}>
        {contactsList.map(({ title, content, icon }, index) => {
          return (
            <li key={index} className={css.item}>
              <div className={css.icon_box}>
                <Icon name={icon} className={css.contact_icon} />
              </div>
              <h4 className={css.title}>{title}</h4>
              {Array.isArray(content) ? (
                content.map((item, idx) => (
                  <h5 key={idx} className={css.content_wrapper}>
                    {item}
                  </h5>
                ))
              ) : (
                <h5 className={css.content_wrapper}>{content}</h5>
              )}
            </li>
          );
        })}
      </ul>
      <MessageForm />
    </div>
  );
}

export default ContactsTable;
