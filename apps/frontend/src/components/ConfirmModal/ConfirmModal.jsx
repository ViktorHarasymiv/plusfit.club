import Modal from "../ui/Modal/Modal";

import css from "./Style.module.css";

function ConfirmModal({ children, isOpen, onClose }) {
  const styleOverlayObj = {
    zIndex: "999992",
  };

  const styleContentObj = {
    maxWidth: "100%",
    width: "fit-content",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayStyle={styleOverlayObj}
      styles={styleContentObj}
    >
      {children}
    </Modal>
  );
}

export default ConfirmModal;
