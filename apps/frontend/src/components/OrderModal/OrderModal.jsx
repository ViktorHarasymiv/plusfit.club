import React, { useState } from "react";
import { useOrderModalStore } from "../../store/useOrderModalStore";

import Modal from "../ui/Modal/Modal";

import css from "./Style.module.css";

import { BsArrowLeft } from "react-icons/bs";
import OrderForm from "./OrderForm";

function OrderModal() {
  const { isOrderModal, closeOrderModal, payload } = useOrderModalStore();

  // STYLE
  const overlayObjStyle = {
    justifyContent: "end",
  };

  const styleObj = {
    maxWidth: "600px",
    padding: "30px",
    width: "100%",
    height: "100vh",
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
          <BsArrowLeft onClick={closeOrderModal} />
          <div className={css.title}>
            Замовлення абонементу
            <h1 className={css.label}>{payload?.name}</h1>
          </div>
        </div>
      </div>
      <div className={css.form_wrapper}>
        <OrderForm payload={payload} />
      </div>
    </Modal>
  );
}

export default OrderModal;
