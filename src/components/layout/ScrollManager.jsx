import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the section named in the URL hash, including when arriving from
 * another route. Scroll-to-top on route change is handled by AnimatePresence
 * in App.jsx so it happens between the exit and enter transitions.
 */
export default function ScrollManager() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (!hash) return undefined;
    const id = decodeURIComponent(hash.slice(1));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let attempts = 0;
    let timer;

    const go = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
      if (attempts++ < 60) timer = setTimeout(go, 50);
    };

    go();
    return () => clearTimeout(timer);
  }, [hash, key]);

  return null;
}
