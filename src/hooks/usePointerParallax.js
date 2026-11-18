import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Pointer position relative to an element's centre, normalised to -1..1 and
 * smoothed with a spring. Stays at 0 for touch input and reduced motion.
 */
export default function usePointerParallax(ref) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) {
      x.set(0);
      y.set(0);
      return undefined;
    }
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const onMove = (event) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      x.set(clamp((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)));
      y.set(clamp((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, ref, x, y]);

  return { x: smoothX, y: smoothY };
}
