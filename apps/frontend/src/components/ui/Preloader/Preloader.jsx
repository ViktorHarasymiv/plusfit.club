import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Preloader.css";

function Preloader() {
  const location = useLocation();
  const preloaderRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
    setFadeOut(false);

    document.documentElement.classList.add("ss-preload");
    document.body.classList.add("ss-show");

    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("ss-preload");
      document.documentElement.classList.add("ss-loaded");
      setFadeOut(true);
    }, 400);

    return () => {
      clearTimeout(timeout);
      document.documentElement.classList.remove("ss-preload");
      document.documentElement.classList.remove("ss-loaded");
      document.body.classList.remove("ss-show");
    };
  }, [location.pathname]);

  useEffect(() => {
    if (preloaderRef.current && fadeOut) {
      const handleTransitionEnd = (e) => {
        if (e.target.id === "preloader") {
          setShowPreloader(false);
        }
      };

      const el = preloaderRef.current;
      el.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        el.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [fadeOut]);

  if (!showPreloader) return null;

  return (
    <div
      id="preloader"
      ref={preloaderRef}
      className={fadeOut ? "fade-out" : ""}
    >
      <div className="loader-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Preloader;
