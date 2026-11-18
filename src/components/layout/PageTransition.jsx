/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../../lib/motion";

// The first page a visitor lands on appears without the page fade, so the
// first paint is never delayed; later route changes use the full transition.
let hasShownPage = false;

export default function PageTransition({ children }) {
  const [skipEnter] = useState(() => !hasShownPage);
  useEffect(() => {
    hasShownPage = true;
  }, []);

  return (
    <motion.div variants={pageTransition} initial={skipEnter ? false : "initial"} animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
