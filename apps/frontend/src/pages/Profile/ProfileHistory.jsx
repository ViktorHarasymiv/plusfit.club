import React from "react";
import { useAuth } from "../../context/AuthContext";
import MyCarnet from "../../components/MyCarnet/MyCarnet";

import css from "./Style.module.css";
import { useEffect } from "react";
import { my_subscription } from "../../services/subscriptions";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  console.log(subscription);

  return (
    <div className={css.setup_wrapper}>
      {subscription?.length > 0 ? (
        <ul className={css.carnet_list}>
          {subscription?.map((info, index) => {
            return <MyCarnet key={index} info={info} />;
          })}
        </ul>
      ) : (
        <div>
          <h3>
            You don't have a current subscription, order one here -{" "}
            <Link to="/price"> Select a subscription</Link>
          </h3>
        </div>
      )}
    </div>
  );
}

export default ProfileHistory;
