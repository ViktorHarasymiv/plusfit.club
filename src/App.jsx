import React from "react";

import "./styles/App.css";

import Header from "./components/Header/Header";
import Router from "./components/Routes/Routes";
import Preloader from "./components/ui/Preloader/Preloader";

function App() {
  return (
    <>
      <Preloader />

      <Header></Header>
      <Router></Router>
    </>
  );
}

export default App;
