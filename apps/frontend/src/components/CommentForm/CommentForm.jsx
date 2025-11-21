import React from "react";
import FormReview from "./FormReview";

import css from "./CommentForm.module.css";

import r1 from "/img/p-5.png";

export default function CommentForm() {
  return (
    <section>
      <div className="container">
        <div className={css.comment_wrapper}>
          <img
            src={r1}
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
