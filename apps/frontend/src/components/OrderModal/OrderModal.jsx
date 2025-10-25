import React, { useState } from "react";
import { useOrderModalStore } from "../../store/useOrderModalStore";

import Modal from "../ui/Modal/Modal";

import css from "./Style.module.css";

import { BsArrowLeft } from "react-icons/bs";
import OrderForm from "./OrderForm";
import { border, borderRadius, height } from "@mui/system";

function OrderModal() {
  const { isOrderModal, closeOrderModal, payload } = useOrderModalStore();

  // STYLE
  const overlayObjStyle = {
    justifyContent: "end",
  };

  const styleObj = {
    maxWidth: "750px",
    padding: "20px 30px",
    width: "100%",
    maxHeight: "99.9vh",
    height: "100%",
    borderRadius: "0px",
    transform: "translateX(0)",
    animation: "slideInX 0.2s ease-in-out",
  };

  return (
    <Modal
      isOpen={isOrderModal}
      onClose={closeOrderModal}
      overlayStyle={overlayObjStyle}
      styles={styleObj}
    >
      <div className={css.modal_wrapper}>
        <div className={css.modal_header}>
          <div className={css.head_nav}>
            <BsArrowLeft onClick={closeOrderModal} />
            <span className={css.title}>Замовлення абонементу</span>
          </div>

          <h1 className={css.label}>{payload?.name}</h1>
        </div>
      </div>
      <div className={css.form_wrapper}>
        <OrderForm payload={payload} />
      </div>
    </Modal>
  );
}

export default OrderModal;
