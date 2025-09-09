import { createContext, useContext } from "react";

const AuthContext = createContext();

const api = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
