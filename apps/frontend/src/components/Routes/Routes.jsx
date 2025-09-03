import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Home from "../../pages/Home/Home";

import Dashboard from "../Admin/Dashboard/Dashboard";

import NotFound from "../NotFound/NotFound";
import Login from "../Admin/AdminRoute/Login/Login";
import PrivateRoute from "../Admin/AdminRoute/PrivateRoute";

function Router() {
  const { isAdmin } = useAuth();

  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Components navigation */}

        {/* Admin */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
