/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { press } from "../../lib/motion";

const MotionLink = motion(Link);

const base =
  "group/button relative inline-flex min-h-[48px] select-none items-center justify-center gap-2.5 rounded-full font-primary text-[11px] font-semibold uppercase tracking-[0.16em] transition-[background-position,background-color,border-color,color,box-shadow] duration-500 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-brand-gradient-wide bg-[length:220%_100%] bg-left px-7 text-white shadow-glow hover:bg-right hover:shadow-glow-sm",
  secondary:
    "border border-white/15 bg-white/[0.04] px-7 text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/[0.08]",
  ghost: "px-3 text-white/70 hover:text-white",
};

/**
 * One button for the whole site. Renders a router Link (`to`), an anchor
 * (`href`) or a <button>, with the same look and press feedback.
 */
const Button = forwardRef(function Button(
  { to, href, external = false, variant = "primary", icon: Icon, className = "", children, ...rest },
  ref
) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0.5"
        />
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );

  if (to) {
    return (
      <MotionLink ref={ref} to={to} className={classes} {...press} {...rest}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <motion.a ref={ref} href={href} className={classes} {...externalProps} {...press} {...rest}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} type="button" className={classes} {...press} {...rest}>
      {content}
    </motion.button>
  );
});

export default Button;
