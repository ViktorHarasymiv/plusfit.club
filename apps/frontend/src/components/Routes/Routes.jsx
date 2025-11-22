import { Routes, Route } from "react-router-dom";
import { AuthGuard } from "../AuthGuard/AuthGuard";

import Home from "../../pages/Home/Home";

import NotFound from "../NotFound/NotFound";
import Rehabilitation from "../Rehabilitation/Rehabilitation";
import AboutUs from "../../pages/AboutUs/AboutUs";
import Price from "../../pages/Price/Price";
import Contacts from "../../pages/Contacts/Contacts";
import Massage from "../Massage/Massage";
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
import Policy from "../../pages/Policy/Policy";
import ProfileLayout from "../../pages/Profile/ProfileLayout";
import ProfileHistory from "../../pages/Profile/ProfileHistory";
import AuthLayout from "../Auth/AuthLayout";

import LoginPage from "../../components/Auth/LoginPage";
import RegistrationPage from "../../components/Auth/RegistrationPage";
import ProfileSetup from "../../pages/Profile/ProfileSetup";
import GoogleAuthRedirect from "../GoogleAuthRedirect/GoogleAuthRedirect";
import ProfileUser from "../../pages/Profile/ProfileUser";
import YogaPrice from "../Yoga/YogaPrice";

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

        <Route path="/google-auth" element={<GoogleAuthRedirect />} />

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
                <ProfileUser />
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

          <Route
            path="setup"
            element={
              <AuthGuard>
                <ProfileSetup />
              </AuthGuard>
            }
          />
        </Route>

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
          <Route path="yoga" element={<Yoga />} />
          <Route path="kids" element={<KidsDance />} />
        </Route>

        {/* about */}

        <Route path="/about" element={<AboutUs />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* price */}

        <Route path="/price" element={<Price />}>
          <Route path="Gym&Fitness" element={<GymPrice />} />
          <Route path="massage" element={<MassagePrice />} />
          <Route path="rehabilitation" element={<RehabilitationPrice />} />
          <Route path="yoga" element={<YogaPrice />} />
        </Route>

        {/* Components navigation */}

        {/* gallery */}

        <Route path="/gallery" element={<Gallery />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* contacts */}

        <Route path="/contacts" element={<Contacts />}>
          {/* <Route path="rehabilitation" element={<Rehabilitation />} /> */}
        </Route>

        {/* Policy  */}

        <Route path="/private-policy" element={<Policy />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
