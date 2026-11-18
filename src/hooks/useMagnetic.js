import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * Pulls an element a few pixels towards the pointer while it hovers.
 * Mouse and trackpad only; inert for touch and reduced motion. Listens on the
 * element itself, so nothing runs while the pointer is elsewhere.
 */
export default function useMagnetic({ strength = 0.28, max = 8, enabled = true } = {}) {
  const reduce = useReducedMotion();
  const active = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    active.current = enabled && !reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!active.current) {
      x.set(0);
      y.set(0);
    }
  }, [enabled, reduce, x, y]);

  const clamp = (value) => Math.max(-max, Math.min(max, value));

  const handlers = {
    onPointerMove(event) {
      if (!active.current || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * strength));
      y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * strength));
    },
    onPointerLeave() {
      x.set(0);
      y.set(0);
    },
  };

  return { handlers, style: { x: useSpring(x, spring), y: useSpring(y, spring) } };
}
