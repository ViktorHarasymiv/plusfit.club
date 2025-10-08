import React from "react";

import css from "../Massage/Style.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MdAccessTime } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

function GymPriceList({ data }) {
  return (
    <div className={css.price_wrapper}>
      {data.map(({ _id, name, features, description }, index) => (
        <div key={_id} style={{ marginBottom: "2rem" }}>
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
              <li key={index} className={css.item}>
                <ul className={css.description_list}>
                  {description.map((item, index) => (
                    <li key={index}>
                      <p>
                        <span>
                          <IoPricetagOutline className={css.icon} />
                          {item.price} ₴
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          <MdAccessTime className={css.icon} />
                          {item.time}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default GymPriceList;
