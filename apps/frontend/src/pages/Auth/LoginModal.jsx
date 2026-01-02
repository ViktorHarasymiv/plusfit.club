import { useAuthModalStore } from "../../store/useAuthModalStore";

import Login from "../../components/Login/Login";
import ChangeLink from "./ChangeLink";

import Modal from "../../components/ui/Modal/Modal";

const styleObj = {
  maxWidth: "500px",
  width: "90%",
  maxHeight: "100%",
  borderRadius: "8px",

  backgroundColor: "rgba(0, 0, 0, 0.3)",
};

function LoginModal() {
  const { isSignInOpen, closeSignIn } = useAuthModalStore();

  return (
    <Modal isOpen={isSignInOpen} onClose={closeSignIn} styles={styleObj}>
      <Login />
      <ChangeLink name={"Sign Up"} />
    </Modal>
  );
}

export default LoginModal;
