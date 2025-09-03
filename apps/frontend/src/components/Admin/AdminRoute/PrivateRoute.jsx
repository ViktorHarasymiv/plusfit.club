import { useAuth } from "../../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { hasAccess } = useAuth();

  if (hasAccess === null) return "Завантаження.....";

  return hasAccess ? children : navigate("/login");
};

export default PrivateRoute;
