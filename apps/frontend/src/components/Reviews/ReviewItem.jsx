import React from "react";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import css from "./Reviews.module.css";
function ReviewItem({ content: { name, section, message, rating } }) {
  return (
    <li className={css.item_wrapper}>
      <h3 className={css.name}>{name}</h3>
      <p className={css.section}>{section}</p>
      <p className={css.message}>{message}</p>
      <div aria-label="Рейтинг">
        <div aria-label="Рейтинг" role="radiogroup">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < rating ? (
                <FaStar style={{ color: "var(--accent-color)" }} />
              ) : (
                <FaRegStar style={{ color: "var(--accent-color)" }} />
              )}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default ReviewItem;
