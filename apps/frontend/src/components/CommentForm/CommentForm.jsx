import React from "react";
import FormReview from "./FormReview";

import css from "./CommentForm.module.css";

export default function CommentForm() {
  return (
    <section>
      <div className="container">
        <div className={css.comment_wrapper}>
          <img
            src=""
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
