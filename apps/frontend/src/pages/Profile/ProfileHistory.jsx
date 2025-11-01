import React from "react";
import { useAuth } from "../../context/AuthContext";
import MyCarnet from "../../components/MyCarnet/MyCarnet";

import css from "./Style.module.css";
import { useEffect } from "react";
import { my_subscription } from "../../services/subscriptions";
import { useState } from "react";

function ProfileHistory() {
  const { user } = useAuth();

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const subsc = async () => {
      const res = await my_subscription(user.email);
      if (res) {
        setSubscription(res);
      }
    };

    subsc();
  }, []);

  return (
    <ul className={css.carnet_list}>
      {subscription?.map((info, index) => {
        return <MyCarnet key={index} info={info} />;
      })}
    </ul>
  );
}

export default ProfileHistory;
