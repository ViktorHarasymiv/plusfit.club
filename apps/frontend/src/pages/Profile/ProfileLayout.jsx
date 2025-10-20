import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import ProfileSideBar from "./ProfileSideBar";

import Reviews from "../../components/Reviews/Reviews";
import CommentForm from "../../components/CommentForm/CommentForm";

import css from "./Style.module.css";

function ProfileLayout() {
  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <div className={css.layout_wrapper}>
            <ProfileSideBar />
            <Outlet />
          </div>
        </div>
        <Reviews />
        <CommentForm />
      </section>
    </main>
  );
}

export default ProfileLayout;
