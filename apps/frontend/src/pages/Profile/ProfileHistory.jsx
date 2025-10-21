import React from "react";
import { useAuth } from "../../context/AuthContext";
import MyCarnet from "../../components/MyCarnet/MyCarnet";

import css from "./Style.module.css";

function ProfileHistory() {
  const { user } = useAuth();

  const { history } = user;

  console.log(history);

  return (
    <ul className={css.carnet_list}>
      {history?.map((info, index) => {
        return <MyCarnet key={index} info={info} />;
      })}
    </ul>
  );
}

export default ProfileHistory;
