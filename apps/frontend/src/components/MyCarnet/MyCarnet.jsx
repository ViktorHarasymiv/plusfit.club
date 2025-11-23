import React from "react";

import css from "./Style.module.css";

import FormattedDate from "../../utils/RemainingTime";
import Logo from "../Logo/Logo";

function MyCarnet({ info }) {
  const { clientId, type, status, startDate, endDate, isVerify } = info;

  const statusColors = {
    "Очікує оплати": "#fffeca",
    Заморожений: "#4d4dff",
    Використаний: "red",
    Активний: "#54b2a9",
  };

  const verifyColors = {
    true: "green",
    false: "red",
  };

  const color = statusColors[status] || "inherit";

  const verifyColor = verifyColors[isVerify] || "inherit";

  return (
    <li className={css.carnet_content}>
      <aside className={css.carnet_wrapper}>
        <div className={css.carnet_head}>
          <div className={css.carnet_verify}>
            {clientId}
            <p>{type}</p>
          </div>
          <Logo size={1} color={true} />
        </div>
        <div className={css.carnet_info}>
          <div className={css.carnet_date}>
            <div className={css.carnet_status}>
              <div>
                <span>
                  {isVerify == true ? "Підтвердженно" : "Очікує підтвердження"}
                </span>
                <span
                  className={css.carnet_detektor}
                  style={{
                    background: verifyColor,
                    marginLeft: "10px",
                  }}
                ></span>
              </div>
              <div>
                {status}
                <span
                  className={css.carnet_detektor}
                  style={{
                    background: color,
                    marginLeft: "10px",
                  }}
                ></span>
              </div>
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
