import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import "./styles/App.css";

import Router from "./components/Routes/Routes";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/ui/Loader/Loader";
import { useLoaderStore } from "./store/loadingStore";

function App() {
  const { isLoading } = useLoaderStore();

  useEffect(() => {
    const body = document.body;

    if (isLoading) {
      body.classList.add("lock");
    } else {
      body.classList.remove("lock");
    }

    return () => {
      body.classList.remove("lock");
    };
  }, [isLoading]);

  const location = useLocation();

  // EFFECTS

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Loader />

      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
