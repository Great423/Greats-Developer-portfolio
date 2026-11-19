/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";
import Loader from "../Loader/Loader";
import { ease } from "../../lib/motion";

/** The page could not be fetched: say so plainly and offer a way back. */
function LoadFailure({ onRetry }) {
  const buttonRef = useRef(null);

  // Nothing else is on screen, so put the keyboard straight on the only action.
  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div role="alert" className="flex min-h-full flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-brand-pink">Connection problem</p>
      <h1 className="mt-5 max-w-md font-primary text-[26px] font-semibold leading-tight text-white md:text-[32px]">
        This page could not be loaded<span className="text-gradient">.</span>
      </h1>
      <p className="mt-4 max-w-sm text-white/65">
        Part of the site failed to download. Check your connection, then try again.
      </p>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onRetry}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="group/button mt-9 inline-flex min-h-[48px] select-none items-center justify-center gap-2.5 rounded-full bg-brand-gradient-wide bg-[length:220%_100%] bg-left px-7 font-primary text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-glow transition-[background-position,box-shadow] duration-500 ease-out-expo hover:bg-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        Try again
        <FiRefreshCw
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover/button:rotate-90"
        />
      </motion.button>
    </div>
  );
}

/**
 * The site's original screen loader: the pulsing hexagonal gel grid, shown
 * full screen over the page background.
 *
 * It covers the first load only, while the route's code is still being
 * fetched. The page renders underneath and the overlay fades off it, so the
 * loader never holds content back and there is no artificial minimum time.
 * Being fixed and detached from the document flow, it shifts no layout.
 * Later route changes use the smaller inline fallback instead of this.
 *
 * If the code cannot be fetched at all, the same overlay stays put and turns
 * into a recovery screen rather than leaving an endless loading animation.
 */
export default function ScreenLoader({ status, onRetry }) {
  const failed = status === "error";
  const visible = failed || status === "loading";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="screen-loader"
          {...(failed ? {} : { role: "status", "aria-label": "Loading" })}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: ease.out } }}
          data-screen-loader=""
          data-state={failed ? "error" : "loading"}
          className="fixed inset-0 z-[300] overflow-y-auto bg-ink"
        >
          {failed ? (
            <LoadFailure onRetry={onRetry} />
          ) : (
            // The grid positions itself from the centre of its container.
            <div aria-hidden="true" className="absolute inset-0">
              <Loader />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
