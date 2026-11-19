/*
 * Runs the hero scene off the main thread. Three.js is parsed, the shaders are
 * compiled and every frame is drawn here, on an OffscreenCanvas, so none of
 * it can delay scrolling, taps or the page's own work.
 *
 * Protocol: the page posts { type: "init", canvas, options }, then
 * { type: <method>, args } for the core's methods, then { type: "dispose" }.
 * The worker answers "alive" as soon as it has loaded, then "ready" or
 * "failed".
 */
import { CORE_METHODS, createSceneCore } from "./heroSceneCore.js";

let core = null;

self.onmessage = ({ data }) => {
  if (data.type === "init") {
    try {
      core = createSceneCore(data.canvas, { ...data.options, onFail: () => self.postMessage({ type: "failed" }) });
      self.postMessage({ type: "ready" });
    } catch {
      self.postMessage({ type: "failed" });
    }
    return;
  }
  if (data.type === "dispose") {
    core?.dispose();
    core = null;
    self.close();
    return;
  }
  if (core && CORE_METHODS.includes(data.type)) core[data.type](...(data.args || []));
};

self.postMessage({ type: "alive" });
