import React from "react";

import Icon from "../ui/Icon/Icon";
import css from "./Style.module.css";

import col1Img from "/img/03.jpg";

function WhyChooseUs() {
  return (
    <section>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.col2}>
            <h2 className={css.title}>Why Choose Us</h2>
            <h3 className={css.about}>
              We Are Trusted Service{" "}
              <span className="active">Provider When</span> You Need It Most
            </h3>
            <p className={css.text}>
              There are many variations of passages rem psum available but the
              majority have suffered alteration in some form by injected humour
              or randomised words which don't look even slightly believable. If
              you are going to use a passage orem psum you need to be sure there
              isn't anything embarrassing hidden tend to repeat predefined
              chunks in the middle of text.
            </p>
            <div className={css.quality_tile}>
              <div className={css.col_quality}>
                <div className={css.icon_tile}>
                  <Icon name="icon-gym" color={"var(--white)"} />
                </div>
                <div className={css.col3}>
                  <h4>Modern Fitness Equipment</h4>
                  <p>
                    There are many variations of passages available the majority
                    have suffered alteration injected humour.
                  </p>
                </div>
              </div>
              <div className={css.col_quality}>
                <div className={css.icon_tile}>
                  <Icon name="icon-member" color={"var(--white)"} />
                </div>
                <div className={css.col3}>
                  <h4>Expert & Qualified Trainers</h4>
                  <p>
                    There are many variations of passages available the majority
                    have suffered alteration injected humour.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.col1}>
            <img src={col1Img} alt="Context image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
