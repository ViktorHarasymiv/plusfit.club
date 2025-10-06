import React from "react";

import css from "./Style.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Decor from "/img/decor.png";

function PriceList({ data }) {
  return (
    <div className={css.price_wrapper}>
      {data.map((categoryBlock, index) => (
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
                    {service.price} ₴ / {service.duration_min} хв
                  </li>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default PriceList;
