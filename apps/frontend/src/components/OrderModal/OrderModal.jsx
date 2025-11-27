import React, { useEffect, useState } from "react";
import { useOrderModalStore } from "../../store/useOrderModalStore";

import Modal from "../ui/Modal/Modal";

import css from "./Style.module.css";

import { BsArrowLeft } from "react-icons/bs";
import OrderForm from "./OrderForm";
import { useWindowWidth } from "../../hooks/useWindowWidth";

function OrderModal() {
  const width = useWindowWidth();

  const { isOrderModal, closeOrderModal, payload } = useOrderModalStore();

  // STYLE

  const [newStyle, setNewStyle] = useState([]);

  const changeStyle = (dynamicWidth) => {
    if (dynamicWidth > 767.98) {
      return {
        borderBottomLeftRadius: "20px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        borderWidth: "2px",
        borderRight: "none",
        borderTop: "transparent",
        borderBottom: "none",
      };
    } else {
      return {
        borderWidth: "0px",
        borderRight: "none",
        borderTop: "transparent",
        borderBottom: "none",
        borderRadius: "0px",
      };
    }
  };

  useEffect(() => {
    setNewStyle(changeStyle(width));
  }, [width]);

  const overlayObjStyle = {
    justifyContent: "end",
  };

  const styleObj = {
    maxWidth: "750px",
    padding: "20px 30px",
    width: "100%",
    maxHeight: "99.9vh",
    height: "100%",

    transform: "translateX(0)",
    animation: "slideInX 0.2s ease-in-out",

    ...newStyle,
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
            <span className={css.title}>Order a subscription</span>
          </div>

          <h1 className={css.label}>{payload?.name}</h1>
        </div>
      </div>
      <div className={css.form_wrapper}>
        <OrderForm payload={payload} close={closeOrderModal} />
      </div>
    </Modal>
  );
}

export default OrderModal;
