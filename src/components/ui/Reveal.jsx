/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

const withDelay = (variants, delay) =>
  delay
    ? { ...variants, show: { ...variants.show, transition: { ...variants.show.transition, delay } } }
    : variants;

/** Reveals a single element the first time it scrolls into view. */
export function Reveal({ as = "div", variants = fadeUp, delay = 0, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component variants={withDelay(variants, delay)} initial="hidden" whileInView="show" viewport={viewportOnce} {...rest}>
      {children}
    </Component>
  );
}

/** Reveals its RevealItem children one after another. */
export function RevealGroup({ as = "div", stagger = 0.08, delay = 0, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** A child of RevealGroup. Inherits the group's timing. */
export function RevealItem({ as = "div", variants = fadeUp, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component variants={variants} {...rest}>
      {children}
    </Component>
  );
}
