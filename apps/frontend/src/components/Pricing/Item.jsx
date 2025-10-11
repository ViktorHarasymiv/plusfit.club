import React from "react";

import css from "./Pricing.module.css";

import Button from "../../components/ui/Button/Button";
import ReverseBtn from "../../components/ui/Button/ReverseBtn";

import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Item({ data, index }) {
  const { name, description, features } = data;

  return (
    <li className={css.item}>
      <div className={css.title_box}>
        <h1 className={css.about_title}>{name}</h1>
        <span className={css.title}>{data.title}</span>
        {description?.map(({ time, price }) => {
          return (
            <div>
              <h2 className={css.price}>
                <span
                  className={`active ${index === 2 ? "override-dark" : ""}`}
                >
                  {price} грн.
                </span>
              </h2>
              <h3>{time}</h3>
            </div>
          );
        })}
      </div>
      <ul className={css.offers_box}>
        <li>
          {features.gym == true ? (
            <MdDone
              className={`active ${index === 2 ? "override-dark" : ""}`}
            />
          ) : (
            <IoMdClose
              className={`active ${index === 2 ? "override-dark" : ""}`}
            ></IoMdClose>
          )}
          <span>Тренажерний зал</span>
        </li>
        <li>
          {features.isActive == true ? (
            <MdDone
              className={`active ${index === 2 ? "override-dark" : ""}`}
            />
          ) : (
            <IoMdClose
              className={`active ${index === 2 ? "override-dark" : ""}`}
            />
          )}
          <span>Бігова доріжка</span>
        </li>
        <li>
          {data.features.consultation == true ? (
            <MdDone />
          ) : (
            <IoMdClose
              className={`active ${index === 2 ? "override-dark" : ""}`}
            />
          )}
          <span>Консультація</span>
        </li>
      </ul>
      {index !== 2 ? (
        <Button styles={{ width: "140px" }}>{"Замовити"}</Button>
      ) : (
        <ReverseBtn styles={{ width: "140px" }}>{"Замовити"}</ReverseBtn>
      )}
    </li>
  );
}
