import React from "react";
import FormReview from "./FormReview";

import css from "./CommentForm.module.css";

import background from "/img/commentBg.jpg";

import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function CommentForm() {
  const width = useWindowWidth();
  return (
    <section>
      <div className="container">
        <div className={css.comment_wrapper}>
          <img
            src={background}
            alt=""
            width={550}
            height={635}
            className={css.comment_background}
          />

          <FormReview />
        </div>
      </div>
    </section>
  );
}
