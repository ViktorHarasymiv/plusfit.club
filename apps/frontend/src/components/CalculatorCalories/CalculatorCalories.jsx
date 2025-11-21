import React, { useState } from "react";

import style from "./CalculatorCalories.module.css";

import FormCalculate from "./Form/FormCalculate";
import Table from "./Table/Table";
import Modal from "../ui/Modal/Modal";

import { FaInfoCircle } from "react-icons/fa";

const modalObjStyle = {
  textAlign: "start",
  borderRadius: "2px",

  maxWidth: "50%",
  width: "100%",
  maxHeight: "75%",
};

export default function CalculatorCalories({ styles }) {
  const [calories, setCalories] = useState(null);

  const [info, setInfo] = useState(false);

  return (
    <section className={style.calculator_section_wrapper}>
      <div className={`container ${styles}`}>
        <div className={style.calculator_content_wrapper}>
          <div className={style.calculator_form_wrapper}>
            <span className={style.calculator_section_title}>
              Weight Calculator
            </span>
            <h2 className={style.calculator_section_about}>
              Calculate your calorie intake
            </h2>
            <FormCalculate calories={calories} setCalories={setCalories} />
          </div>
          <div className={style.calculator_result_wrapper}>
            <Table />
            <h5 className={style.result_title}>
              Basal metabolism (BMR) / Body mass index (BMI){" "}
              <FaInfoCircle
                onClick={() => setInfo((prev) => !prev)}
                className={style.info_icon}
              />
            </h5>
            {calories && (
              <>
                <p className={style.result_value}>BMR : {calories?.BMR} kcal</p>
                <p className={style.result_value}>
                  BMI : {calories?.BMI} index
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* MODAL */}
      <Modal
        isOpen={info}
        onClose={() => setInfo(false)}
        styles={modalObjStyle}
      >
        <h3 className={style.modal_title}>Information</h3>
        <h3>Calculated using the Mifflin-St Jeor formula</h3>
        <div style={{ marginBottom: "40px" }}>
          <b style={{ display: "inline-block", marginBottom: "20px" }}>
            BMR is the basal metabolic rate.
          </b>
          <br />
          <span>
            This is the number of calories your body burns each day at rest —
            simply to maintain vital functions such as breathing, blood
            circulation, the functioning of internal organs, and the nervous
            system.
            <br />
            <br />
            It is important to understand that the basal metabolic rate (BMR)
            does not take into account muscle mass, age, gender, or body fat
            distribution. For example, a person with significant muscle mass can
            have a high body mass index (BMI) and still be perfectly healthy.
            <br />
            <br />
            <b>
              Our algorithm also takes into account your level of physical
              activity throughout the day, so the calculation shows an
              approximate number of calories you need to consume to maintain
              your current level. This allows you to more accurately adapt your
              diet to your lifestyle.
            </b>
          </span>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <b style={{ display: "inline-block", marginBottom: "20px" }}>
            BMI is a general indicator.
          </b>
          <br />
          <span>
            It does not take into account muscle mass, age, gender, or fat
            distribution. For example, an athlete can have a high BMI but be
            completely healthy.
          </span>
        </div>
      </Modal>
    </section>
  );
}
