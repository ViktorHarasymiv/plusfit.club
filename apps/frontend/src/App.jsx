import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import "./styles/App.css";

import Router from "./components/Routes/Routes";

import Preloader from "./components/ui/Preloader/Preloader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();

  // EFFECTS

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* <Preloader /> */}

      <Header></Header>
      <Router></Router>

      <Footer></Footer>
    </>
  );
}

export default App;
