import { Outlet } from "react-router-dom";

import NavigationContext from "../../components/NavigationContext/NavigationContext";
import CommentForm from "../../components/CommentForm/CommentForm";

import Pricing from "../../components/Pricing/Pricing";
import EatBrand from "../../components/EatBrand/EatBrand";

export default function Price() {
  return (
    <main>
      <NavigationContext />
      <Outlet />
      <Pricing />
      <CommentForm />
      <EatBrand />
    </main>
  );
}
