import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // твій контекст
import Loader from "../ui/Loader/Loader";

export const AuthGuard = ({ children, publicOnly = false }) => {
  const { authorized, loading } = useAuth();

  if (loading || authorized === null) return <Loader />;

  if (publicOnly && authorized) {
    return <Navigate to="/" replace />;
  }

  if (!publicOnly && !authorized) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
