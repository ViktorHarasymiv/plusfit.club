import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import css from "../Massage/Style.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MdAccessTime } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { useOrderModalStore } from "../../store/useOrderModalStore";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button/Button";

function GymPriceList({ data }) {
  const { authorized } = useAuth();
  const { openOrderModal } = useOrderModalStore();

  const navigate = useNavigate();

  const payloadDataModal = (item) => {
    if (authorized) {
      openOrderModal(item);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className={css.price_wrapper}>
      {data.map((item, index) => {
        const { _id, name, description, about } = item;

        return (
          <motion.div
            key={_id}
            initial={{
              opacity: 0,
              x: index === 0 || index === 2 ? -50 : 50,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <Accordion defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "var(--accent-color)" }} />
                  }
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{
                    "&.Mui-expanded": {
                      borderBottom: "1px solid var(--accent-color)",
                    },
                  }}
                >
                  <Typography component="span">
                    <h3 className={css.title}>{name}</h3>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <li className={css.item}>
                    <ul className={css.description_list}>
                      {description.map((desc, i) => (
                        <li key={`${_id}-${i}`}>
                          <p>
                            <span>
                              <IoPricetagOutline className={css.icon} />
                              {desc.price} $
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                              <MdAccessTime className={css.icon} />
                              {desc.time}
                            </span>
                          </p>
                          <p className={css.about_text}>{about}</p>
                        </li>
                      ))}
                    </ul>
                    <Button
                      styles={{ maxHeight: "34px", fontSize: "12px" }}
                      action={() => payloadDataModal(item)}
                    >
                      GET ORDER
                    </Button>
                  </li>
                </AccordionDetails>
              </Accordion>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default GymPriceList;
