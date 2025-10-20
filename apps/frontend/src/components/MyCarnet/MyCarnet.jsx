import React from "react";

import css from "./Style.module.css";

import Logo from "/logo/logoLight.png";
import FormattedDate from "../../utils/RemainingTime";

function MyCarnet({ info }) {
  const { clientId, type, method, status, startDate, endDate } = info;
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
            <p>{status}</p>
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
