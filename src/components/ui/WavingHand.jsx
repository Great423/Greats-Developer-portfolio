/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";

/*
 * The wave: a few decreasing swings around the wrist, not a loop. Rotation
 * only, so the emoji never moves the text around it.
 */
const wave = {
  rotate: [0, 14, -8, 14, -4, 10, 0],
  transition: { duration: 1.5, ease: "easeInOut", times: [0, 0.15, 0.3, 0.4, 0.5, 0.6, 0.75] },
};

/**
 * Waving hand emoji. Waves once when it scrolls into view and again on
 * hover or tap, so it can be replayed on purpose but never nags.
 * Decorative: the greeting beside it carries the meaning.
 */
export default function WavingHand({ className = "" }) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (inView && !reduce) controls.start(wave);
  }, [inView, reduce, controls]);

  const replay = () => {
    if (!reduce) controls.start(wave);
  };

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      // Framer Motion makes elements with tap handlers focusable; this is
      // decorative and hidden from assistive tech, so keep it out of the
      // tab order rather than offering a focus stop that is never announced.
      tabIndex={-1}
      data-waving-hand=""
      animate={controls}
      onHoverStart={replay}
      onTapStart={replay}
      style={{ transformOrigin: "70% 70%" }}
      className={`inline-block cursor-grab select-none [-webkit-tap-highlight-color:transparent] ${className}`}
    >
      👋
    </motion.span>
  );
}
