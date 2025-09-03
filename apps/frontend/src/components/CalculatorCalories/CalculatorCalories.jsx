import React, { useState } from "react";

import style from "./CalculatorCalories.module.css";

import FormCalculate from "./Form/FormCalculate";
import Table from "./Table/Table";
import Modal from "../ui/Modal/Modal";

import { FaInfoCircle } from "react-icons/fa";

const modalObjStyle = {
  textAlign: "start",
  borderRadius: "2px",

  width: "90%",
  maxHeight: "80%",

  overflowY: "scroll",
};

export default function CalculatorCalories() {
  const [calories, setCalories] = useState(null);

  const [info, setInfo] = useState(false);

  return (
    <section className={style.calculator_section_wrapper}>
      <div className="container">
        <div className={style.calculator_content_wrapper}>
          <div className={style.calculator_form_wrapper}>
            <span className={style.calculator_section_title}>
              Weight Calculator
            </span>
            <h2 className={style.calculator_section_about}>
              Обчисліть норму калорій
            </h2>
            <FormCalculate setCalories={setCalories} />
          </div>
          <div className={style.calculator_result_wrapper}>
            <Table></Table>
            <h5 className={style.result_title}>
              Базальний метаболізм (BMR) / Індекс маси тіла (BMI){" "}
              <FaInfoCircle
                onClick={() => setInfo((prev) => !prev)}
                className={style.info_icon}
              />
            </h5>
            {calories && (
              <>
                <p className={style.result_value}>BMR : {calories?.BMR} Ккал</p>
                <p className={style.result_value}>
                  BMI : {calories?.BMI} індекс
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* MODAL */}
      <Modal
        isOpen={info}
        onClose={() => setInfo((prev) => !prev)}
        styles={modalObjStyle}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          💡 Застереження
        </h2>
        <h4>Розраховано за формулою Mifflin-St Jeor</h4>
        <div style={{ marginBottom: "40px" }}>
          <b style={{ display: "inline-block", marginBottom: "20px" }}>
            BMR — базальний рівень метаболізму.
          </b>
          <br />
          <span>
            Це кількість калорій, яку ваше тіло витрачає щодня в стані повного
            спокою — просто для підтримки життєво важливих функцій, таких як
            дихання, кровообіг, робота внутрішніх органів та нервової системи.
            <br />
            <br />
            Важливо розуміти, що базальний рівень метаболізму (BMR) не враховує
            м’язову масу, вік, стать чи розподіл жирової тканини. Наприклад,
            людина зі значною м’язовою масою може мати високий індекс маси тіла
            (BMI), але при цьому бути абсолютно здоровою.
            <br />
            <br />
            <b>
              Наш алгоритм враховує також рівень фізичної активності протягом
              дня, тому розрахунок показує орієнтовну кількість калорій, яку
              потрібно споживати для підтримки поточного рівня. Це дозволяє
              точніше адаптувати харчування до способу життя.
            </b>
          </span>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <b style={{ display: "inline-block", marginBottom: "20px" }}>
            BMI — це загальний індикатор.
          </b>
          <br />
          <span>
            Він не враховує м’язову масу, вік, стать чи розподіл жиру.
            Наприклад, спортсмен може мати високий BMI, але бути абсолютно
            здоровим.
          </span>
        </div>
      </Modal>
    </section>
  );
}
