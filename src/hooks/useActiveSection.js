import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Sections can mount after this hook runs (lazy routes), so it waits briefly
 * for them before observing.
 */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);
  const key = ids.join("|");
  const total = ids.length;

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return undefined;
    }

    let observer;
    let attempts = 0;
    let timer;

    const start = () => {
      const elements = key
        .split("|")
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      // Wait until every section has mounted (the homepage renders after a
      // route transition), then observe whatever exists.
      if (elements.length < total && attempts++ < 40) {
        timer = setTimeout(start, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      elements.forEach((element) => observer.observe(element));
    };

    start();
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [key, total, enabled]);

  return active;
}
