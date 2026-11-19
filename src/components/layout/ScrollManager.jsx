import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * How much of the journey is covered by a smooth glide when the visitor
 * arrives from another route. The content in between was never on screen, so
 * animating across the whole page would only make the trip slow.
 */
const ARRIVAL_GLIDE = 520;

/** Keep watching for this long after the scroll settles, for late layout shifts. */
const SETTLE_WATCH = 2500;

/**
 * The most the position is allowed to be nudged. This corrects drift from
 * content settling above the target, so anything larger means the page is
 * somewhere else entirely and is none of its business.
 */
const MAX_CORRECTION = 240;

/**
 * Scrolls to the section named in the URL hash, including when arriving from
 * another route. Scroll-to-top on route change is handled by AnimatePresence
 * in App.jsx so it happens between the exit and enter transitions.
 *
 * Same page: a full smooth scroll, which shows how far the section is.
 * Arriving from another route: jump most of the way instantly, then glide the
 * last stretch, so the section is reached promptly and still arrives smoothly.
 * Either way, once scrolling stops the position is re-checked for a moment, so
 * images or sections settling above the target cannot leave it off screen.
 */
export default function ScrollManager() {
  const { hash, key, pathname } = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const arriving = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!hash) return undefined;

    const id = decodeURIComponent(hash.slice(1));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let attempts = 0;
    let corrections = 0;
    let timer;
    let frame;
    let cancelled = false;

    // Anything the visitor does with the page wins over the rest of this.
    const cancel = () => {
      cancelled = true;
    };
    const listening = { passive: true };
    window.addEventListener("wheel", cancel, listening);
    window.addEventListener("touchstart", cancel, listening);
    window.addEventListener("keydown", cancel, listening);

    const offsetFor = (element) => parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
    const topFor = (element) => element.getBoundingClientRect().top + window.scrollY - offsetFor(element);

    /**
     * Once scrolling has stopped, nudge the target back into place if it
     * drifted. After it has settled, any movement this did not cause belongs
     * to someone else (a scrollbar drag, a "back to top" button, a script),
     * so it gives way immediately rather than pulling the page back.
     */
    const holdPosition = (element) => {
      const deadline = performance.now() + SETTLE_WATCH;
      const placeOf = () => Math.round(element.getBoundingClientRect().top + window.scrollY);
      let lastY = null;
      let stillFrames = 0;
      let alignedY = null;
      let alignedPlace = null;

      const step = () => {
        if (cancelled) return;
        const y = window.scrollY;

        if (alignedY !== null) {
          if (placeOf() !== alignedPlace) {
            // The section itself moved in the document, so content above it
            // changed height. That is drift, and worth re-aligning.
            alignedY = null;
            alignedPlace = null;
            stillFrames = 0;
          } else if (y !== alignedY) {
            // The page moved but the section did not: someone else scrolled.
            return;
          }
        }

        stillFrames = y === lastY ? stillFrames + 1 : 0;
        lastY = y;

        if (stillFrames >= 3) {
          const drift = Math.round(element.getBoundingClientRect().top - offsetFor(element));
          if (Math.abs(drift) > 2 && Math.abs(drift) <= MAX_CORRECTION && corrections < 4) {
            window.scrollBy({ top: drift, behavior: "instant" });
            corrections += 1;
            stillFrames = 0;
            lastY = window.scrollY;
          } else {
            alignedY = y;
            alignedPlace = placeOf();
          }
        }
        if (performance.now() < deadline) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const go = () => {
      const target = document.getElementById(id);
      if (!target) {
        if (attempts++ < 60) timer = setTimeout(go, 50);
        return;
      }

      if (reduce) {
        window.scrollTo({ top: topFor(target), behavior: "instant" });
        holdPosition(target);
        return;
      }

      const destination = topFor(target);
      if (arriving && Math.abs(destination - window.scrollY) > ARRIVAL_GLIDE) {
        const from = destination > window.scrollY ? destination - ARRIVAL_GLIDE : destination + ARRIVAL_GLIDE;
        window.scrollTo({ top: Math.max(0, from), behavior: "instant" });
      }
      // Measured again here, so the glide ends exactly on the section.
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      holdPosition(target);
    };

    go();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [hash, key, pathname]);

  return null;
}
