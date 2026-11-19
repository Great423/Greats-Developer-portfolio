/*
 * Page-side controller for the hero 3D scene.
 *
 * The scene itself (heroSceneCore.js) runs in a worker on an OffscreenCanvas
 * wherever the browser supports WebGL there, so Three.js and every frame stay
 * off the main thread. Elsewhere it runs here instead. Either way this module
 * does the parts that need the page: sizing, visibility, pointer, scroll and
 * touch gestures, and it drives the scene through the same small interface.
 *
 * It is only ever loaded with a dynamic import(), and it never imports
 * Three.js itself: that arrives with the worker or with the fallback chunk.
 */
import { CORE_METHODS } from "./heroSceneCore.methods.js";

const DRAG_GAIN = 0.009;

const probeContext = (canvas) => {
  const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
  context?.getExtension("WEBGL_lose_context")?.loseContext();
  return Boolean(context);
};

/**
 * Where the scene can run: "worker" (WebGL on an OffscreenCanvas, off the
 * main thread), "main" (WebGL on the page only) or null (no WebGL at all).
 * One probe either way, made only when the scene is about to load.
 */
export function sceneSupport() {
  try {
    if (
      typeof Worker !== "undefined" &&
      typeof OffscreenCanvas !== "undefined" &&
      "transferControlToOffscreen" in HTMLCanvasElement.prototype &&
      probeContext(new OffscreenCanvas(1, 1))
    ) {
      return "worker";
    }
    return probeContext(document.createElement("canvas")) ? "main" : null;
  } catch {
    return null;
  }
}

/** Starts the worker and resolves once it has loaded, or rejects if it cannot. */
function startWorker() {
  return new Promise((resolve, reject) => {
    let worker;
    try {
      worker = new Worker(new URL("./heroScene.worker.js", import.meta.url), { type: "module" });
    } catch (error) {
      reject(error);
      return;
    }
    const onMessage = ({ data }) => {
      if (data.type !== "alive") return;
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      resolve(worker);
    };
    const onError = (error) => {
      worker.terminate();
      reject(error);
    };
    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);
  });
}

/** The same interface as the core, forwarded to the worker. */
function workerProxy(worker) {
  const proxy = {};
  CORE_METHODS.forEach((type) => {
    proxy[type] = (...args) => worker.postMessage({ type, args });
  });
  proxy.dispose = () => worker.postMessage({ type: "dispose" });
  return proxy;
}

/**
 * Creates the scene on `canvas`. Returns { dispose } straight away and
 * reports through onReady / onFail once the scene is up.
 * Options: mode (from sceneSupport()), reducedMotion (render one still frame), lite (phones and coarse
 * pointers: fewer nodes and signals, lower pixel ratio, 30 fps while idle),
 * interactionTarget (element that receives drag-to-spin and tap-to-pulse;
 * vertical swipes on it still scroll the page), onReady, onFail.
 */
export function createHeroScene(
  canvas,
  { mode = "main", reducedMotion = false, lite = false, interactionTarget = null, onReady, onFail } = {}
) {
  const options = {
    reducedMotion,
    lite,
    pixelRatio: Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75),
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };
  const cleanups = [];
  let core = null;
  let disposed = false;

  // Page state the scene needs, sent only when it changes.
  let inView = true;
  const syncActive = () => core?.setActive(inView && !document.hidden);

  const connect = (scene) => {
    core = scene;
    syncActive();
    core.setScroll(Math.min(1, Math.max(0, window.scrollY / window.innerHeight)));

    const resizeObserver = new ResizeObserver(() => core.resize(canvas.clientWidth, canvas.clientHeight));
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncActive();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", syncActive);
    cleanups.push(() => {
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", syncActive);
    });

    // Scroll and pointer: coalesced to one update per frame, and only sent
    // while the scene is on screen.
    let pending = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerMoved = false;
    const flush = () => {
      pending = 0;
      core.setScroll(Math.min(1, Math.max(0, window.scrollY / window.innerHeight)));
      if (pointerMoved) {
        core.setPointer(pointerX, pointerY);
        pointerMoved = false;
      }
    };
    const schedule = () => {
      if (!pending && inView) pending = requestAnimationFrame(flush);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    cleanups.push(() => {
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", schedule);
    });

    // Pointer: the halo turns a little towards the cursor (fine pointers only)
    const followPointer = !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (followPointer) {
      const onPointerMove = (event) => {
        if (!inView) return;
        const rect = canvas.getBoundingClientRect();
        pointerX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)));
        pointerY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)));
        pointerMoved = true;
        schedule();
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));
    }

    // Touch and drag: a horizontal drag spins the lattice (with inertia), a tap
    // sends a pulse through it. `touch-action: pan-y` hands vertical swipes to
    // the browser, which scrolls the page and cancels the gesture here.
    const target = reducedMotion ? null : interactionTarget;
    if (!target) return;
    const previousStyle = { touchAction: target.style.touchAction, cursor: target.style.cursor };
    const drag = { id: null, startX: 0, startY: 0, lastX: 0, lastTime: 0, startTime: 0, horizontal: false };

    const onPointerDown = (event) => {
      if (drag.id !== null || (event.pointerType === "mouse" && event.button !== 0)) return;
      // Mouse: stop the press from starting a text selection or an image drag.
      if (event.pointerType === "mouse") event.preventDefault();
      drag.id = event.pointerId;
      drag.startX = drag.lastX = event.clientX;
      drag.startY = event.clientY;
      drag.startTime = drag.lastTime = performance.now();
      drag.horizontal = false;
      core.dragStart();
    };
    const onPointerMoveDrag = (event) => {
      if (event.pointerId !== drag.id) return;
      const now = performance.now();
      if (!drag.horizontal) {
        const dx = Math.abs(event.clientX - drag.startX);
        const dy = Math.abs(event.clientY - drag.startY);
        if (dx < 6 || dx < dy) return;
        drag.horizontal = true;
        if (event.pointerType === "mouse") target.setPointerCapture?.(event.pointerId);
        target.style.cursor = "grabbing";
      }
      core.dragBy((event.clientX - drag.lastX) * DRAG_GAIN, Math.max(1, now - drag.lastTime) / 1000);
      drag.lastX = event.clientX;
      drag.lastTime = now;
    };
    const endDrag = (event, cancelled) => {
      if (event.pointerId !== drag.id) return;
      const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
      const quick = performance.now() - drag.startTime < 400;
      if (!cancelled && !drag.horizontal && moved < 8 && quick) core.pulse();
      // A release after the pointer has rested keeps no momentum.
      core.dragEnd(performance.now() - drag.lastTime <= 90);
      drag.id = null;
      drag.horizontal = false;
      if (followPointer) target.style.cursor = "grab";
    };
    const onPointerUp = (event) => endDrag(event, false);
    const onPointerCancel = (event) => endDrag(event, true);

    target.style.touchAction = "pan-y pinch-zoom";
    if (followPointer) target.style.cursor = "grab";
    target.addEventListener("pointerdown", onPointerDown);
    target.addEventListener("pointermove", onPointerMoveDrag, { passive: true });
    // Releases are heard on the window so a drag can end anywhere.
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    cleanups.push(() => {
      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("pointermove", onPointerMoveDrag);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      Object.assign(target.style, previousStyle);
    });
  };

  const fail = () => {
    if (!disposed) onFail?.();
  };

  /** Fallback: the core on the main thread, as on browsers without OffscreenCanvas WebGL. */
  const runHere = async () => {
    const { createSceneCore } = await import("./heroSceneCore.js");
    if (disposed) return;
    const scene = createSceneCore(canvas, { ...options, onFail: fail });
    connect(scene);
    onReady?.();
  };

  const runInWorker = async () => {
    let worker;
    try {
      worker = await startWorker();
    } catch {
      // The worker could not load (no module workers): the canvas is still
      // untouched, so the scene can run here instead.
      if (!disposed) await runHere();
      return;
    }
    if (disposed) {
      worker.terminate();
      return;
    }
    worker.addEventListener("message", ({ data }) => {
      if (data.type === "ready") {
        if (!disposed) onReady?.();
      } else if (data.type === "failed") {
        fail();
      }
    });
    const offscreen = canvas.transferControlToOffscreen();
    worker.postMessage({ type: "init", canvas: offscreen, options }, [offscreen]);
    connect(workerProxy(worker));
    cleanups.push(() => setTimeout(() => worker.terminate(), 1000));
  };

  (mode === "worker" ? runInWorker() : runHere()).catch(fail);

  return {
    dispose() {
      disposed = true;
      cleanups.splice(0).forEach((cleanup) => cleanup());
      core?.dispose();
      core = null;
    },
  };
}
