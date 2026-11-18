/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

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

/**
 * Lazy WebGL halo around the hero portrait. Three.js is fetched only when the
 * browser is idle, never blocks the first paint, and the canvas ignores all
 * pointer events so it cannot interfere with text, links or scrolling.
 * `interactionRef` names the element (the portrait area) that takes
 * drag-to-spin and tap-to-pulse once the scene is running.
 */
export default function HeroScene({ className = "", interactionRef = null }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState("fallback");
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const saveData = navigator.connection?.saveData;
    if (saveData || !supportsWebGL()) return undefined;

    const isLite =
      window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(pointer: coarse)").matches;
    setLite(isLite);

    let cancelled = false;
    let instance;
    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 350));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;

    const handle = idle(
      async () => {
        try {
          const { createHeroScene } = await import("./heroScene.js");
          if (cancelled || !canvasRef.current) return;
          instance = createHeroScene(canvasRef.current, {
            reducedMotion: Boolean(reduce),
            lite: isLite,
            interactionTarget: interactionRef?.current ?? null,
            onReady: () => !cancelled && setState("ready"),
            onFail: () => !cancelled && setState("failed"),
          });
        } catch {
          if (!cancelled) setState("failed");
        }
      },
      { timeout: 2000 }
    );

    return () => {
      cancelled = true;
      cancelIdle(handle);
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
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out-expo ${
          state === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
