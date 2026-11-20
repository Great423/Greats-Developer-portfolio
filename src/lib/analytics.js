/*
 * Visitor analytics: Vercel Web Analytics, loaded the way Vercel's own
 * script tag documents it, without adding a dependency.
 *
 * What it records, per page view: the page, the referrer, the country, and
 * the device, browser and operating system. It sets no cookies and keeps no
 * personal identifiers; a visitor is a hash that Vercel discards after 24 hours.
 * It cannot tell you who anyone is, only how many came, from where and to what.
 *
 * The script is served from this site's own /_vercel/insights path, so there
 * is no third party connection. Vercel serves it only once Web Analytics is
 * switched on for the project (Project > Analytics > Enable); until then the
 * request is a harmless 404. It follows route changes by itself, so every
 * page of the single page app is counted.
 *
 * It starts after the page has loaded and the browser is idle, so it never
 * competes with what the visitor is waiting for.
 */

const SCRIPT_SRC = "/_vercel/insights/script.js";

/** Respect a visitor's explicit "do not track me" signal. */
function trackingRefused() {
  return navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true;
}

function inject() {
  if (trackingRefused()) return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

  // The queue Vercel's script drains once it has loaded.
  window.va =
    window.va ||
    function va(...params) {
      (window.vaq = window.vaq || []).push(params);
    };

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.defer = true;
  script.onerror = () => {
    console.info("[analytics] Not loaded. Enable Web Analytics for this project in Vercel (Analytics tab) and redeploy, or check for an ad blocker.");
  };
  document.head.appendChild(script);
}

/** Starts analytics in production builds only. */
export function startAnalytics() {
  if (!import.meta.env.PROD) return;
  const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1500));
  const begin = () => idle(inject, { timeout: 3000 });
  if (document.readyState === "complete") begin();
  else window.addEventListener("load", begin, { once: true });
}
