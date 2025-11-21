import React from "react";
import { useOrderModalStore } from "../../store/useOrderModalStore";

import css from "./Pricing.module.css";

import Button from "../../components/ui/Button/Button";
import ReverseBtn from "../../components/ui/Button/ReverseBtn";

import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Item({ data, i }) {
  const { authorized } = useAuth();
  const { openOrderModal } = useOrderModalStore();

  const { name, description, features } = data;

  const navigate = useNavigate();

  const payloadDataModal = (item) => {
    if (authorized) {
      openOrderModal(item);
    } else {
      navigate("/auth/login");
    }
  };

  console.log(features);

  return (
    <>
      <li className={css.item}>
        <div className={css.title_box}>
          <h1 className={css.about_title}>{name}</h1>
          <span className={css.title}>{data.title}</span>
          {description?.map(({ time, price }, index) => {
            return (
              <div key={index}>
                <h2 className={css.price}>
                  <span className={`active ${i === 2 ? "override-dark" : ""}`}>
                    {price} $
                  </span>
                </h2>
                <h3>{time}</h3>
              </div>
            );
          })}
        </div>
        {features && (
          <ul className={css.offers_box}>
            <li>
              {features.gym ? (
                <MdDone
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              ) : (
                <IoMdClose
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              )}
              <span>Gym / Fitness</span>
            </li>
            <li>
              {features.isActive ? (
                <MdDone
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              ) : (
                <IoMdClose
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              )}
              <span>Racetrack</span>
            </li>
            <li>
              {features.consultation ? (
                <MdDone
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              ) : (
                <IoMdClose
                  className={`active ${i === 2 ? "override-dark" : ""}`}
                />
              )}
              <span>Advice</span>
            </li>
          </ul>
        )}
        {i !== 2 ? (
          <Button
            styles={{ width: "140px" }}
            action={() => payloadDataModal(data)}
          >
            {"Order"}
          </Button>
        ) : (
          <ReverseBtn
            styles={{ width: "140px" }}
            action={() => payloadDataModal(data)}
          >
            {"Order"}
          </ReverseBtn>
        )}
      </li>
    </>
  );
}
