import { useEffect, useRef } from "react";
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const spring = { stiffness: 160, damping: 20, mass: 0.5 };

/**
 * Perspective tilt with a soft moving highlight, for project media.
 * Attach `handlers` to the card (so the stretched link still triggers it),
 * `ref` and `style` to the element that tilts, and `glareStyle` to an overlay.
 * Disabled for touch input and reduced motion.
 */
export default function useTilt({ max = 5 } = {}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const enabled = useRef(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionValue(0);

  useEffect(() => {
    enabled.current = !reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, [reduce]);

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glare.set(0);
  };

  const handlers = {
    onPointerMove(event) {
      if (!enabled.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const u = (event.clientX - rect.left) / rect.width;
      const v = (event.clientY - rect.top) / rect.height;
      if (u < 0 || u > 1 || v < 0 || v > 1) {
        reset();
        return;
      }
      rotateY.set((u - 0.5) * 2 * max);
      rotateX.set((0.5 - v) * 2 * max);
      glareX.set(u * 100);
      glareY.set(v * 100);
      glare.set(1);
    },
    onPointerLeave: reset,
  };

  const background = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), rgba(255,86,246,0.05) 35%, transparent 60%)`;

  return {
    ref,
    handlers,
    style: { rotateX: useSpring(rotateX, spring), rotateY: useSpring(rotateY, spring), transformPerspective: 1200 },
    glareStyle: { background, opacity: useSpring(glare, spring) },
  };
}
