import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import "./styles/App.css";

import Router from "./components/Routes/Routes";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { useFullscreenStore } from "./store/fullscreenStore";
import LoginModal from "./pages/Auth/LoginModal";
import RegistrationModal from "./pages/Auth/RegistrationModal";

function App() {
  const { isOpen } = useFullscreenStore();

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add("lock");
    } else {
      body.classList.remove("lock");
    }

    return () => {
      body.classList.remove("lock");
    };
  }, [isOpen]);

  const location = useLocation();

  // EFFECTS

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <LoginModal />
      <RegistrationModal />

      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
