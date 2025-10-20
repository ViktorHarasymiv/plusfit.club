import React from "react";
import { Outlet } from "react-router-dom";
import NavigationContext from "../NavigationContext/NavigationContext";

function AuthLayout() {
  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
