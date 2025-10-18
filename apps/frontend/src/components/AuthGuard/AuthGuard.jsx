import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // твій контекст

export const AuthGuard = ({ children, publicOnly = false }) => {
  const { authorized, loading } = useAuth();

  if (!authorized || loading) return null; // або <Loader />

  if (publicOnly && authorized) {
    return <Navigate to="/" replace />;
  }

  if (!publicOnly && !authorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
