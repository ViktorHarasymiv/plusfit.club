import React from "react";

import css from "./Style.module.css";

import { useAuth } from "../../../context/AuthContext";

import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { BiCustomize } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

function UserInfoBar() {
  const { user } = useAuth();

  const width = useWindowWidth();

  const { height, weight, section, goal, BMI, BMR } = user;

  return (
    <div className={css.user_info_tile}>
      <div>
        <p>
          <GiBodyHeight /> {height ? `${height}sm` : "-"}
        </p>
        <p>
          <FaWeightScale /> {weight ? `${weight}kg` : "-"}
        </p>
      </div>
      {width > 991 && (
        <div>
          <p>
            <BiCustomize /> {section ? section : "-"}
          </p>
          <p>
            <GoGoal /> {goal ? goal : "-"}
          </p>
        </div>
      )}
      <div>
        <p>BMI: {BMI ? `${BMI} idx` : "-"}</p>
        <p>BMR: {BMR ? `${BMR} kcal` : "-"}</p>
      </div>
    </div>
  );
}

export default UserInfoBar;
