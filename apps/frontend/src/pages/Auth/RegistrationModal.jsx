import { useAuthModalStore } from "../../store/useAuthModalStore";

import Modal from "../../components/ui/Modal/Modal";
import Registration from "../../components/Registration/Registration";
import ChangeLink from "./ChangeLink";

function RegistrationModal() {
  const { isSignUpOpen, closeSignUp } = useAuthModalStore();

  const styleObj = {
    maxWidth: "500px",
    width: "90%",
    maxHeight: "100%",
    borderRadius: "8px",

    backgroundColor: "rgba(0, 0, 0, 0.3)",
  };

  return (
    <Modal isOpen={isSignUpOpen} onClose={closeSignUp} styles={styleObj}>
      <Registration />
      <ChangeLink name={"Вхід"} />
    </Modal>
  );
}

export default RegistrationModal;
