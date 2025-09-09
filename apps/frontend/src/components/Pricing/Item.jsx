import React from "react";
import { Link } from "react-router-dom";
import css from "./Pricing.module.css";

import Button from "../../components/ui/Button/Button";
import ReverseBtn from "../../components/ui/Button/ReverseBtn";

import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Item({ data }) {
  return (
    <li className={css.item}>
      <div className={css.title_box}>
        <h1 className={css.about_title}>{data.name}</h1>
        <span className={css.title}>{data.title}</span>
        <h2 className={css.price}>
          <span className="active">{data.price}</span>
          {data.currency}
        </h2>
      </div>
      <ul className={css.offers_box}>
        <li>
          <MdDone></MdDone>
          {data.services.time}
        </li>
        <li>
          {data.services.gym == true ? (
            <MdDone />
          ) : (
            <IoMdClose className={css.false_ico}></IoMdClose>
          )}
          <span>Тренажерний зал</span>
        </li>
        <li>
          {data.services.fitness == true ? (
            <MdDone />
          ) : (
            <IoMdClose className={css.false_ico} />
          )}
          <span>Бігова доріжка</span>
        </li>
        <li>
          {data.services.consultation == true ? (
            <MdDone />
          ) : (
            <IoMdClose className={css.false_ico} />
          )}
          <span>Консультація</span>
        </li>
        <li>
          {data.services.nutritionist == true ? (
            <MdDone />
          ) : (
            <IoMdClose className={css.false_ico} />
          )}
          <span>Нутриціолог</span>
        </li>
        <li>
          {data.services.massage == true ? (
            <MdDone />
          ) : (
            <IoMdClose
              className={css.false_ico}
              style={data.name === "Преміум" && { color: "#000" }}
            />
          )}
          <span>Масаж</span>
        </li>
        {data.services.sale && (
          <li>
            <MdDone />
            {data.services.sale} {data.currency} економії
          </li>
        )}
      </ul>
      {data.name !== "Преміум" ? (
        <Button styles={{ width: "140px" }}>{"Замовити"}</Button>
      ) : (
        <ReverseBtn styles={{ width: "140px" }}>{"Замовити"}</ReverseBtn>
      )}
    </li>
  );
}
