import { motion } from "framer-motion";
import css from "./Style.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MdAccessTime } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

function PriceList({ data }) {
  return (
    <div className={css.price_wrapper}>
      {data.map((categoryBlock, index) => (
        <motion.div
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
          <div key={categoryBlock._id} style={{ marginBottom: "2rem" }}>
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
                  <h3 className={css.title}>{categoryBlock.category}</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {categoryBlock.services.map((service, index) => (
                    <li key={index} className={css.item}>
                      <strong className={css.type_name}>{service.name}</strong>
                      {service.description && (
                        <>
                          {" "}
                          — <em>{service.description}</em>
                        </>
                      )}
                      <br />
                      <IoPricetagOutline className={css.icon} />
                      <span>{service.price} ₴</span>{" "}
                      <MdAccessTime className={css.icon} />
                      {service.duration_min} хв
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default PriceList;
