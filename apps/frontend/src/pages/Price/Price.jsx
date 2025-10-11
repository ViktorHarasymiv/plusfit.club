import { Outlet } from "react-router-dom";

import NavigationContext from "../../components/NavigationContext/NavigationContext";
import CommentForm from "../../components/CommentForm/CommentForm";

import Pricing from "../../components/Pricing/Pricing";

export default function Price() {
  return (
    <main>
      <NavigationContext />
      <section>
        <Outlet />
        <Pricing />
        <CommentForm />
      </section>
    </main>
  );
}
