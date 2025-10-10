import { useLoaderStore } from "../../../store/loadingStore.js";

import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

import css from "./Style.module.css";

function Loader() {
  const { isLoading } = useLoaderStore();

  if (!isLoading) return null;

  return (
    <div className={css.overflow}>
      <PuffLoader
        color={"var(--accent-color)"}
        size={54}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <motion.div
        initial={{ opacity: 0, y: 30, perspective: "100px" }}
        whileInView={{ opacity: 1, y: 0, perspective: "1000px" }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 2, delay: 0, ease: "easeOut" }}
      >
        <h2 className={css.loader_title}>Welcom to Plus Fit Club</h2>
      </motion.div>
    </div>
  );
}

export default Loader;
