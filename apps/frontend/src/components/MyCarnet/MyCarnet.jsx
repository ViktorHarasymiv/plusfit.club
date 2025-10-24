import React from "react";

import css from "./Style.module.css";

import Logo from "/logo/logoLight.png";
import FormattedDate from "../../utils/RemainingTime";

function MyCarnet({ info }) {
  const { clientId, type, status, startDate, endDate } = info;

  const statusColors = {
    "Очікує оплати": "#fffeca",
    Заморожений: "#4d4dff",
    Використаний: "red",
    Активний: "#54b2a9",
  };

  const color = statusColors[status] || "inherit";

  return (
    <li className={css.carnet_content}>
      <aside className={css.carnet_wrapper}>
        <div className={css.carnet_head}>
          <div>{clientId}</div>
          <img src={Logo} alt="Firm logo PlusFit" width={72} height="100%" />
        </div>
        <div className={css.carnet_info}>
          <div className={css.carnet_date}>
            <p>{type}</p>
            <div className={css.carnet_status}>
              {status}
              <span
                className={css.carnet_detektor}
                style={{
                  background: color,
                }}
              ></span>
            </div>
          </div>
          <div className={css.carnet_date}>
            <p>
              <FormattedDate isoDate={startDate} />
            </p>
            <p>
              <FormattedDate isoDate={endDate} />
            </p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default MyCarnet;
