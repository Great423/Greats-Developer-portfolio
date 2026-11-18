import { useEffect, useState } from "react";

/**
 * Scroll spy. Returns the id of the last section whose top has passed a line
 * at `line` of the viewport height (45% by default), or null above the first.
 * At the very bottom of a scrollable page the last section wins, so short
 * final sections still activate.
 *
 * Measures at most once per animation frame, only on scroll, resize or a
 * change in page height (lazy routes mounting), and only sets state when the
 * result changes.
 */
export default function useActiveSection(ids, enabled = true, line = 0.45) {
  const [active, setActive] = useState(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return undefined;
    }

    const list = key.split("|");
    let frame = 0;

    const measure = () => {
      frame = 0;
      const mark = window.innerHeight * line;
      let current = null;
      let currentTop = -Infinity;
      let last = null;
      let lastTop = -Infinity;

      list.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const { top } = element.getBoundingClientRect();
        if (top > lastTop) {
          last = id;
          lastTop = top;
        }
        if (top <= mark && top > currentTop) {
          current = id;
          currentTop = top;
        }
      });

      const root = document.documentElement;
      const scrollable = root.scrollHeight > window.innerHeight + 4;
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 4;
      setActive(scrollable && atBottom && last ? last : current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, enabled, line]);

  return active;
}
