import { lazy, Suspense, useEffect, useState } from "react";

/*
 * Visitor analytics: Vercel's own <Analytics /> component (@vercel/analytics).
 *
 * What it records, per page view: the page, the referrer, the country, and
 * the device, browser and operating system. It sets no cookies and keeps no
 * personal identifiers; a visitor is a hash that Vercel discards after 24 hours.
 * It cannot tell you who anyone is, only how many came, from where and to what.
 *
 * The script is served from this site's own /_vercel/insights path, so there
 * is no third party connection. Vercel serves it only once Web Analytics is
 * switched on for the project (Project > Analytics > Enable). The component
 * follows route changes by itself, so every page of the app is counted.
 *
 * It is fetched as its own chunk, after the page has loaded and the browser is
 * idle, so it never competes with what the visitor is waiting for, and it is
 * left out entirely for visitors who send Do Not Track or Global Privacy
 * Control, and in development.
 */
const Analytics = lazy(() => import("@vercel/analytics/react").then((module) => ({ default: module.Analytics })));

function trackingRefused() {
  return navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true;
}

export default function AnalyticsLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!import.meta.env.PROD || trackingRefused()) return undefined;

    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1500));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    let handle;
    const begin = () => {
      handle = idle(() => setReady(true), { timeout: 3000 });
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.removeEventListener("load", begin);
      if (handle !== undefined) cancelIdle(handle);
    };
  }, []);

  return ready ? (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  ) : null;
}
