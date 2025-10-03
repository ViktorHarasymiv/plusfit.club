import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home/Home";

import NotFound from "../NotFound/NotFound";
import Subscriber from "../Subscriber/Subscriber";
import Offer from "../../pages/Offer/Offer";
import Rehabilitation from "../Rehabilitation/Rehabilitation";
import AboutUs from "../../pages/AboutUs/AboutUs";
import Price from "../../pages/Price/Price";
import Contacts from "../../pages/Contacts/Contacts";
import Massage from "../Massage/Massage";
import Endosphere from "../Endosphere/Endosphere";
import Yoga from "../Yoga/Yoga";
import KidsDance from "../KidsDance/KidsDance";
import OfferLayout from "../../pages/Offer/OfferLayout";
import Team from "../../pages/Team/Team";
import TeamLayout from "../../pages/Team/TeamLayout";

function Router() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Components navigation */}

        <Route path="/subscriber/:id" element={<Subscriber />} />

        {/* Team */}

        <Route path="/team" element={<TeamLayout />}>
          <Route path=":id" element={<Team />} />
        </Route>

        {/* Offers */}
        <Route path="/offer" element={<OfferLayout />}>
          <Route index element={<Offer />} />

          <Route path="rehabilitation" element={<Rehabilitation />} />
          <Route path="massage" element={<Massage />} />
          <Route path="endosphere" element={<Endosphere />} />
          <Route path="yoga" element={<Yoga />} />
          <Route path="kids" element={<KidsDance />} />
        </Route>

        <Route path="/about" element={<AboutUs />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        <Route path="/price" element={<Price />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        <Route path="/gallery" element={<Price />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        <Route path="/contacts" element={<Contacts />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
