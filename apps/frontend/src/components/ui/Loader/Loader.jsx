import { PuffLoader } from "react-spinners";
import css from "./Style.module.css";

function Loader() {
  return (
    <div className={css.overflow}>
      <div className={css.content}>
        <PuffLoader
          color={"var(--accent-color)"}
          size={54}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
