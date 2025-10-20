import Login from "../Login/Login";

import css from "./Style.module.css";

import style from "../../components/ui/Modal/Modal.module.css";

function LoginPage() {
  return (
    <div className={css.auth_wrapper}>
      <div className={style.modal_content}>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
