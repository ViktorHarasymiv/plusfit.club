import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home/Home";

import NotFound from "../NotFound/NotFound";
import Subscriber from "../Subscriber/Subscriber";

function Router() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Components navigation */}

        <Route path="/subscriber/:id" element={<Subscriber />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
