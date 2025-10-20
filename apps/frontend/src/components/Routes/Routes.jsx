import { Routes, Route } from "react-router-dom";
import { AuthGuard } from "../AuthGuard/AuthGuard";

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
import MassagePrice from "../Massage/MassagePrice";
import RehabilitationPrice from "../Rehabilitation/RehabilitationPrice";
import GymPrice from "../Gym/GymPrice";
import Gym from "../Gym/Gym";
import Gallery from "../../pages/Gallery/Gallery";
import Profile from "../../pages/Profile/Profile";
import Policy from "../../pages/Policy/Policy";
import ProfileLayout from "../../pages/Profile/ProfileLayout";
import ProfileHistory from "../../pages/Profile/ProfileHistory";
import AuthLayout from "../Auth/AuthLayout";

import LoginPage from "../../components/Auth/LoginPage";
import RegistrationPage from "../../components/Auth/RegistrationPage";

function Router() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}

        <Route
          path="/auth"
          element={
            <AuthGuard publicOnly>
              <AuthLayout />
            </AuthGuard>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfileLayout />
            </AuthGuard>
          }
        >
          <Route
            path="user"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="history"
            element={
              <AuthGuard>
                <ProfileHistory />
              </AuthGuard>
            }
          />
        </Route>

        {/* Components navigation */}

        <Route path="/subscriber/:id" element={<Subscriber />} />

        {/* Team */}

        <Route path="/team" element={<TeamLayout />}>
          <Route path=":id" element={<Team />} />
        </Route>

        {/* Offers */}
        <Route path="/offer" element={<OfferLayout />}>
          {/* <Route index element={<Offer />} /> */}

          <Route path="gym" element={<Gym />} />
          <Route path="rehabilitation" element={<Rehabilitation />} />
          <Route path="massage" element={<Massage />} />
          <Route path="endosphere" element={<Endosphere />} />
          <Route path="yoga" element={<Yoga />} />
          <Route path="kids" element={<KidsDance />} />
        </Route>

        {/* about */}

        <Route path="/about" element={<AboutUs />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* price */}

        <Route path="/price" element={<Price />}>
          <Route path="gym" element={<GymPrice />} />
          <Route path="massage" element={<MassagePrice />} />
          <Route path="rehabilitation" element={<RehabilitationPrice />} />
        </Route>

        {/* gallery */}

        <Route path="/gallery" element={<Gallery />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* contacts */}

        <Route path="/contacts" element={<Contacts />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        <Route path="/policy" element={<Policy />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
