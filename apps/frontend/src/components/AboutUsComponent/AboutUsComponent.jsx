import React from "react";

import Icon from "../ui/Icon/Icon";
import css from "./Style.module.css";

import col1Img from "/img/01.jpg";
import col2Img from "/img/02.jpg";
import Button from "../ui/Button/Button";
import { Link } from "react-router-dom";

function AboutUsComponent() {
  return (
    <section>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.col1}>
            <img src={col1Img} alt="Context image" />
            <img src={col2Img} alt="Context image" />
          </div>
          <div className={css.col2}>
            <h2 className={css.title}>About Us</h2>
            <h3 className={css.about}>
              We make yourself{" "}
              <span className="active">stronger than your</span> best excuses
            </h3>
            <p className={css.text}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </p>
            <div className={css.quality_tile}>
              <div className={css.col_quality}>
                <Icon name="icon-member" color={"var(--accent-color)"} />
                <div className={css.col3}>
                  <h4>Qualified Instructor</h4>
                  <p>Take a look at our round up of the best shows.</p>
                </div>
              </div>
              <div className={css.col_quality}>
                <Icon name="icon-gym" color={"var(--accent-color)"} />
                <div className={css.col3}>
                  <h4>Get Fitness Training</h4>
                  <p>It has survived not only five centuries.</p>
                </div>
              </div>
              <Link to={"/offer/gym"}>
                <Button>Discover more</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsComponent;
