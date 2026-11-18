/*
 * Shared motion system. Every animated element draws its timing and easing
 * from here so the site moves with one consistent rhythm.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.jsx (transforms are skipped, opacity still fades) and by the CSS
 * media query in index.css for CSS animations.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
};

/** Reveal once, when a fifth of the element is visible. */
export const viewportOnce = { once: true, amount: 0.2 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: ease.out } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: ease.out } },
};

/** Text that slides up from behind an overflow-hidden mask. */
export const maskReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.95, ease: ease.out } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: ease.inOut } },
};

/** Interaction feedback for buttons and links. */
export const press = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 420, damping: 30 },
};

export const navSpring = { type: "spring", stiffness: 380, damping: 34 };

/**
 * Press-in for cards and large touch targets. The short delay means a touch
 * that turns into a scroll is cancelled before anything visibly moves.
 */
export const cardPress = {
  whileTap: { scale: 0.975, transition: { delay: 0.06, duration: 0.18, ease: ease.out } },
  transition: { type: "spring", stiffness: 380, damping: 28 },
};
