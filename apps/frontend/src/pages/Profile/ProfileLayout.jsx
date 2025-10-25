import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import ProfileSideBar from "./ProfileSideBar";

import Reviews from "../../components/Reviews/Reviews";
import CommentForm from "../../components/CommentForm/CommentForm";

import css from "./Style.module.css";
import ProfileDashboard from "./ProfileDashboard";

function ProfileLayout() {
  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <div className={css.layout_wrapper}>
            <ProfileSideBar />
            <div className={css.outlet_wrapper}>
              <ProfileDashboard />
              <Outlet />
            </div>
          </div>
        </div>
        <Reviews />
        <CommentForm />
      </section>
    </main>
  );
}

export default ProfileLayout;
