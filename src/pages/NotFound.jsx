import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../lib/motion";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Button from "../components/ui/Button";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
      <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show" className="max-w-xl">
        <motion.p variants={fadeUp} className="eyebrow">
          404
        </motion.p>
        <motion.h1 variants={fadeUp} className="mt-6 font-primary text-title font-semibold text-white">
          Page not found.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-lead text-white/65">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" icon={FiArrowLeft}>
            Back to home
          </Button>
          <Button to="/projects" variant="secondary">
            All projects
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
