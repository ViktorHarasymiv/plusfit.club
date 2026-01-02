import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { checkSession } from "../../services/auth";
import Loader from "../ui/Loader/Loader";

const GoogleAuthRedirect = () => {
  const { loginWithGoogleCode, fetchUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const login = async () => {
      // Уникнути повторного використання
      if (sessionStorage.getItem("google_code_used") === code) return;
      sessionStorage.setItem("google_code_used", code);

      // Обробити токен → створити сесію
      await loginWithGoogleCode(code);

      // Дати час на встановлення куки
      await new Promise((r) => setTimeout(r, 300));

      // Тільки тепер перевірити сесію
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        await fetchUser();
        navigate("/profile/user", { replace: true });
      } else {
        console.warn("❌ Сесія не встановилась після логіну");
      }
    };

    login();
  }, []);

  return (
    <main>
      <Loader />
    </main>
  );
};

export default GoogleAuthRedirect;
