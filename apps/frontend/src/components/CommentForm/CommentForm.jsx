import FormReview from "./FormReview";

import css from "./CommentForm.module.css";

import r1 from "/img/p-5.jpg";

export default function CommentForm() {
  return (
    <section>
      <div className="container">
        <div className={css.comment_wrapper}>
          <div className={css.image_wrapper}>
            <img
              src={r1}
              alt=""
              width={550}
              height={635}
              className={css.comment_background}
            />
          </div>
          <FormReview />
        </div>
      </div>
    </section>
  );
}
