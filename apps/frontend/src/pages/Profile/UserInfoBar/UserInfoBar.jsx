import React from "react";

import css from "./Style.module.css";
import { useAuth } from "../../../context/AuthContext";

function UserInfoBar() {
  const { user } = useAuth();

  const { BMI, BMR } = user;

  return (
    <div>
      {BMI} BMI / {BMR} BMR
    </div>
  );
}

export default UserInfoBar;
