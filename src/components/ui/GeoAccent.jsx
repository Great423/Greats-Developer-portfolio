/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Icosahedron: the same geometric language as the hero lattice, drawn as SVG.
const PHI = (1 + Math.sqrt(5)) / 2;
const VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
});
const EDGES = [];
VERTICES.forEach((a, i) =>
  VERTICES.forEach((b, j) => {
    if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 1.1) EDGES.push([i, j]);
  })
);

function project(angle) {
  const cy = Math.cos(angle);
  const sy = Math.sin(angle);
  const cx = Math.cos(0.5 + angle * 0.35);
  const sx = Math.sin(0.5 + angle * 0.35);
  return VERTICES.map(([x, y, z]) => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const y2 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    return [50 + x1 * 44, 50 + y2 * 44, z2];
  });
}

const path = (points, front) =>
  EDGES.filter(([a, b]) => (points[a][2] + points[b][2] >= 0) === front)
    .map(([a, b]) => `M${points[a][0].toFixed(2)} ${points[a][1].toFixed(2)}L${points[b][0].toFixed(2)} ${points[b][1].toFixed(2)}`)
    .join("");

/**
 * Decorative wireframe that turns as its section scrolls past. No continuous
 * animation; static under reduced motion. Purely decorative (aria-hidden).
 */
export default function GeoAccent({ className = "", id }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const angle = useTransform(scrollYProgress, [0, 1], reduce ? [0.9, 0.9] : [-0.4, 2.2]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const front = useTransform(angle, (value) => path(project(value), true));
  const back = useTransform(angle, (value) => path(project(value), false));
  const gradientId = `geo-gradient-${id}`;

  return (
    <motion.svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 100 100"
      style={{ y }}
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#406aff" />
          <stop offset="55%" stopColor="#b936ee" />
          <stop offset="100%" stopColor="#FF56F6" />
        </linearGradient>
      </defs>
      <motion.path d={back} stroke={`url(#${gradientId})`} strokeWidth="0.35" strokeOpacity="0.35" fill="none" />
      <motion.path d={front} stroke={`url(#${gradientId})`} strokeWidth="0.55" strokeOpacity="0.9" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}
