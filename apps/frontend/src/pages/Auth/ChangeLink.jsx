import React from "react";
import { useAuthModalStore } from "../../store/useAuthModalStore";

import css from "./Style.module.css";

function ChangeLink({ name }) {
  const { changeSign } = useAuthModalStore();

  const variable =
    name === "Sign Up"
      ? "You don`t have an account?"
      : "Already have an account?";
  return (
    <div>
      <h5 className={css.change_link}>
        {variable}
        <span onClick={() => changeSign()} className={css.link}>
          {name}
        </span>
      </h5>
    </div>
  );
}

export default ChangeLink;
