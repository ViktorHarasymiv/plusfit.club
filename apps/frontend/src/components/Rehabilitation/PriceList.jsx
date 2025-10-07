import React from "react";

import css from "../Massage/Style.module.css";

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
        <div key={categoryBlock.id} style={{ marginBottom: "2rem" }}>
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
                <h3 className={css.title}>Пакет №{categoryBlock.pack}</h3>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <li key={index} className={css.item}>
                  <ul className={css.description_list}>
                    {categoryBlock.description.map((item, index) => (
                      <li className={css.type_name}>{item}</li>
                    ))}
                  </ul>
                  <ul>
                    {Array.isArray(categoryBlock.price) ? (
                      categoryBlock.price.map((price, index) => (
                        <li>
                          <p key={index}>
                            <IoPricetagOutline className={css.icon} />
                            {price}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li>
                        <IoPricetagOutline className={css.icon} />
                        {categoryBlock.price}
                      </li>
                    )}
                  </ul>

                  <p>
                    <MdAccessTime className={css.icon} />
                    {categoryBlock.duration_min} хв
                  </p>
                </li>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default PriceList;
