import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imageSizes, imageSources } from "./src/lib/images.js";

/*
 * Every page is a lazily loaded route, so on a slow network the browser
 * would otherwise fetch in a chain: HTML, then the entry script, then (only
 * once that has run) the route's chunk, then the images that route shows.
 * These hints let it start everything the current page needs at once.
 */

/** Route chunks, by path, and the image each route paints first. */
const ROUTES = [
  { path: "/", exact: true, module: "src/pages/Home.jsx", image: "/assets/about2.png", sizes: imageSizes.portrait },
  { path: "/projects", exact: true, module: "src/pages/Projects.jsx" },
  { path: "/project-info/", exact: false, module: "src/pages/ProjectInfo.jsx" },
];

/*
 * Fonts are deliberately not preloaded. Measured on slow 4G with a mid-range
 * phone, preloading them took bandwidth from the entry script and delayed
 * first paint by about 300ms without bringing the main content any sooner:
 * nothing renders until the script has run, and the self-hosted files are
 * small and same-origin, so they arrive in time for that first render.
 */

function earlyHints() {
  return {
    name: "early-hints",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, { bundle }) {
        if (!bundle) return html;
        const outputs = Object.values(bundle);
        const entry = outputs.find((output) => output.type === "chunk" && output.isEntry);

        // A route's chunk plus everything it imports, minus the entry.
        const chunkFiles = (module) => {
          const chunk = outputs.find(
            (output) => output.type === "chunk" && output.facadeModuleId?.replace(/\\/g, "/").endsWith(module)
          );
          if (!chunk) throw new Error(`early-hints: no chunk for ${module}`);
          const files = new Set([chunk.fileName]);
          const visit = (current) =>
            current.imports.forEach((name) => {
              if (name === entry.fileName || files.has(name)) return;
              files.add(name);
              visit(bundle[name]);
            });
          visit(chunk);
          return [...files];
        };

        const routes = ROUTES.map(({ path, exact, module, image, sizes }) => {
          const route = [exact ? 1 : 0, path, chunkFiles(module)];
          if (image) route.push([imageSources(image).avif, sizes]);
          return route;
        });

        // Runs during parsing, before the stylesheet, so nothing blocks it.
        const script = `<script>(function(r){var p=location.pathname,d=document,h=d.head;function a(l){h.appendChild(l)}for(var i=0;i<r.length;i++){var x=r[i];if(x[0]?p!==x[1]:p.indexOf(x[1])!==0)continue;x[2].forEach(function(f){var l=d.createElement("link");l.rel="modulepreload";l.crossOrigin="";l.href="/"+f;a(l)});if(x[3]){var m=d.createElement("link");m.rel="preload";m.as="image";m.type="image/avif";m.setAttribute("imagesrcset",x[3][0]);m.setAttribute("imagesizes",x[3][1]);m.setAttribute("fetchpriority","high");a(m)}break}})(${JSON.stringify(
          routes
        )})</script>`;

        if (!html.includes("<!-- early-hints -->")) throw new Error("early-hints: marker missing from index.html");
        return html.replace("<!-- early-hints -->", script);
      },
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), earlyHints()],
  // The hero scene's worker is an ES module (it is constructed with type: "module").
  worker: { format: "es" },
  build: {
    // Never inline fonts into the stylesheet: that would put them on the
    // render-blocking path and stop them from caching separately.
    assetsInlineLimit: (file) => (file.endsWith(".woff2") ? false : undefined),
  },
});
