import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationContext from "../NavigationContext/NavigationContext";
import { verifyEmailCode } from "../../services/auth";
import Button from "../ui/Button/Button";

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
          <div
            style={{
              background: "rgba(0, 0, 0, .3)",
              paddingBlock: "20px",
              borderRadius: "12px",
            }}
          >
            <form onSubmit={handleSubmit} className="form_wrapper">
              <div className="input_wrapper">
                <p>Enter the code sent to {email}</p>
                <input
                  name="code"
                  placeholder="Verification code"
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
