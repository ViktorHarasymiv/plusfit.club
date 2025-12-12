import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailCode } from "../../services/auth";

import NavigationContext from "../NavigationContext/NavigationContext";
import Button from "../ui/Button/Button";

import css from "./Style.module.css";

export default function VerifyForm() {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmailCode(email, code);
      alert("Account verified successfully ✅");
      navigate("/profile");
    } catch (err) {
      alert("Verification failed ❌");
    }
  };

  return (
    <main>
      <NavigationContext />
      <section>
        <div className="container">
          <div className={css.verify_wrapper}>
            <form onSubmit={handleSubmit} className={css.form_wrapper}>
              <div className={css.input_wrapper}>
                <span>
                  Enter the code sent to:{" "}
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
                <input
                  name="code"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input"
                />
              </div>
              <Button type="submit">Verify</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
