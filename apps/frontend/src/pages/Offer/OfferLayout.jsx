import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import css from "./Offer.module.css";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SideNavigation from "../../components/SideNavigation/SideNavigation";
import Reviews from "../../components/Reviews/Reviews";
import CommentForm from "../../components/CommentForm/CommentForm";
import EatBrand from "../../components/EatBrand/EatBrand";

export default function OfferLayout() {
  document.title = "Iron Mass - Offers";

  const location = useLocation();

  const selectedGroup = location.pathname.replace("/offer/", "");

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const group = capitalizeFirst(selectedGroup);

  console.log(group);

  return (
    <main>
      <NavigationContext />
      <div className="container">
        <div className={css.layout_wrapper}>
          <SideNavigation />
          <Outlet />
        </div>
      </div>
      <Reviews filterType={group} />

      <CommentForm />
      <EatBrand />
    </main>
  );
}
