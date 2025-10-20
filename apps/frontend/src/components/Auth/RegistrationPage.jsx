import css from "./Style.module.css";

import style from "../../components/ui/Modal/Modal.module.css";
import Registration from "../Registration/Registration";

function RegistrationPage() {
  return (
    <div className={css.auth_wrapper}>
      <div className={style.modal_content}>
        <Registration />
      </div>
    </div>
  );
}

export default RegistrationPage;
