import React from "react";

import css from "./Style.module.css";
import Icon from "../ui/Icon/Icon";
import MessageForm from "./MessageForm";

function ContactsTable({ data }) {
  const { address, email, phone, media } = data;

  const contactsList = [
    {
      id: 0,
      title: "Address",
      content: address.street,
      icon: "icon-map",
    },
    {
      id: 1,
      title: "Phone",
      content: phone,
      icon: "icon-phone-call",
    },
    {
      id: 2,
      title: "Message",
      content: email,
      icon: "icon-message",
    },
    {
      id: 3,
      title: "Schedule",
      content: ["Mn - Fr 9:00 - 21:00"],
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
