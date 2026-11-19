/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Static CSS version of the halo: a dotted lattice band and two tilted orbit
 * rings. Shown while the WebGL scene loads, and permanently when WebGL is
 * unavailable, Save-Data is on, or the context is lost.
 */
function HaloFallback({ visible }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-out-expo ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ perspective: "900px" }}
    >
      <div className="absolute inset-[11%] rounded-full bg-[radial-gradient(rgba(185,54,238,0.55)_1px,transparent_1.6px)] [background-size:15px_15px] [mask-image:radial-gradient(circle,transparent_60%,black_68%,black_74%,transparent_80%)]" />
      <div className="absolute inset-[11%] rounded-full border border-brand-violet/20" />
      <div
        className="absolute inset-[9%] rounded-full border border-brand-violet/[0.18]"
        style={{ transform: "rotateX(66deg) rotateY(12deg) rotateZ(-30deg)" }}
      />
      <div
        className="absolute inset-[16%] rounded-full border border-brand-pink/[0.12]"
        style={{ transform: "rotateY(64deg) rotateZ(18deg)" }}
      />
    </div>
  );
}

/** Devices and connections where the 3D would cost more than it gives. */
function constrainedDevice() {
  const connection = navigator.connection;
  if (connection?.saveData) return true;
  if (/(^|-)2g$/.test(connection?.effectiveType || "")) return true;
  // deviceMemory is reported in GB, rounded down and capped; 1 or less marks a low-end phone.
  return typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 1;
}

/**
 * Lazy WebGL halo around the hero portrait. Three.js is fetched only after the
 * page has finished loading and the browser is idle, so it never competes
 * with the page's own code and images, and where supported it runs in a
 * worker. The canvas ignores all pointer events so it cannot interfere with
 * text, links or scrolling. Low-end devices, Save-Data and 2G keep the CSS
 * halo instead. `interactionRef` names the element (the portrait area) that
 * takes drag-to-spin and tap-to-pulse once the scene is running.
 */
export default function HeroScene({ className = "", interactionRef = null }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState("fallback");
  const [lite, setLite] = useState(false);

  useEffect(() => {
    if (constrainedDevice() || typeof window.WebGLRenderingContext === "undefined") return undefined;

    const isLite =
      window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(pointer: coarse)").matches;
    setLite(isLite);

    let cancelled = false;
    let instance;
    let handle;
    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 350));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;

    const load = async () => {
      try {
        const { createHeroScene, sceneSupport } = await import("./heroScene.js");
        if (cancelled || !canvasRef.current) return;
        const mode = sceneSupport();
        if (!mode) {
          setState("failed");
          return;
        }
        instance = createHeroScene(canvasRef.current, {
          mode,
          reducedMotion: Boolean(reduce),
          lite: isLite,
          interactionTarget: interactionRef?.current ?? null,
          onReady: () => !cancelled && setState("ready"),
          onFail: () => !cancelled && setState("failed"),
        });
      } catch {
        if (!cancelled) setState("failed");
      }
    };

    // Wait for the page's own resources, then for a quiet moment.
    const begin = () => {
      handle = idle(load, { timeout: 2000 });
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", begin);
      if (handle !== undefined) cancelIdle(handle);
      instance?.dispose();
    };
  }, [reduce, interactionRef]);

  return (
    <div
      aria-hidden="true"
      data-scene-state={state}
      data-scene-lite={lite ? "true" : "false"}
      className={`pointer-events-none select-none ${className}`}
    >
      <HaloFallback visible={state !== "ready"} />
      <canvas
        // A canvas can hand control to a worker only once, so a new attempt
        // (reduced motion toggled mid-visit) gets a fresh element.
        key={reduce ? "still" : "animated"}
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out-expo ${
          state === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
