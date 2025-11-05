import { useAuthModalStore } from "../../store/useAuthModalStore";

import Modal from "../../components/ui/Modal/Modal";

const styleObj = {
  maxWidth: "500px",
  width: "90%",
  maxHeight: "100%",
  borderRadius: "8px",

  backgroundColor: "rgba(0, 0, 0, 0.3)",
};

import Login from "../../components/Login/Login";
import ChangeLink from "./ChangeLink";

function LoginModal() {
  const { isSignInOpen, closeSignIn, changeSign } = useAuthModalStore();

  return (
    <Modal isOpen={isSignInOpen} onClose={closeSignIn} styles={styleObj}>
      <Login />
      <ChangeLink name={"Зареєструватись"} />
    </Modal>
  );
}

export default LoginModal;
