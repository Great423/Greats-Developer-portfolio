/* eslint-disable react/prop-types */
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import AmbientBackground from "./components/layout/AmbientBackground";
import AnalyticsLoader from "./components/layout/AnalyticsLoader";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
import RouteErrorBoundary from "./components/layout/RouteErrorBoundary";
import ScreenLoader from "./components/layout/ScreenLoader";
import ScrollManager from "./components/layout/ScrollManager";
import Contact from "./components/sections/Contact";
import Loader from "./components/Loader/Loader";
import NotFound from "./pages/NotFound";

const loadHome = () => import("./pages/Home");
const loadProjects = () => import("./pages/Projects");
const loadProjectInfo = () => import("./pages/ProjectInfo");

const Home = lazy(loadHome);
const Projects = lazy(loadProjects);
const ProjectInfo = lazy(loadProjectInfo);

// At least a full viewport tall: the Contact section renders after the routes
// on every page, and a shorter placeholder left it peeking into view, only to
// be pushed away when the page arrived (a large layout shift on every load).
function RouteFallback() {
  return (
    <div className="relative grid min-h-screen place-items-center pt-[var(--header-h)]" role="status" aria-label="Loading">
      <Loader />
    </div>
  );
}

/*
 * Sits inside the Suspense boundary, so it mounts only once the route's code
 * has arrived and React commits the page. That is the moment the first load
 * is over, with no timer involved.
 */
function PageReady({ onReady }) {
  useEffect(() => onReady(), [onReady]);
  return null;
}

const page = (element, onReady) => (
  <PageTransition>
    <Suspense fallback={<RouteFallback />}>
      <PageReady onReady={onReady} />
      {element}
    </Suspense>
  </PageTransition>
);

function AnimatedRoutes({ onReady }) {
  const location = useLocation();
  return (
    // No `initial={false}` here: it would also cancel the entrance and
    // scroll-reveal animations inside the first page. PageTransition skips
    // only the page fade on first load instead.
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!window.location.hash) window.scrollTo(0, 0);
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />, onReady)} />
        <Route path="/projects" element={page(<Projects />, onReady)} />
        <Route path="/project-info/:id" element={page(<ProjectInfo />, onReady)} />
        <Route path="*" element={page(<NotFound />, onReady)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // "loading" until the first page commits, then "ready". "error" means a
  // route's code could not be fetched, which React cannot recover from on its
  // own: a failed lazy import stays rejected, so recovery is a fresh load.
  const [status, setStatus] = useState("loading");
  const onReady = useCallback(() => setStatus((current) => (current === "error" ? current : "ready")), []);
  const onRouteError = useCallback(() => setStatus("error"), []);
  const retry = useCallback(() => window.location.reload(), []);

  // Fetch the other route chunks once the first page has settled, so
  // navigating never has to wait on the network. A prefetch that fails is not
  // a problem in itself: the route reports it if the visitor goes there.
  useEffect(() => {
    if (navigator.connection?.saveData) return undefined;
    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1200));
    const ignore = () => {};
    const handle = idle(() => {
      loadHome().catch(ignore);
      loadProjects().catch(ignore);
      loadProjectInfo().catch(ignore);
    });
    return () => (window.cancelIdleCallback || window.clearTimeout)(handle);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScreenLoader status={status} onRetry={retry} />
      <Router>
        <ScrollManager />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <Header />
        <main id="main" tabIndex={-1} className="relative outline-none">
          <RouteErrorBoundary onError={onRouteError}>
            <AnimatedRoutes onReady={onReady} />
          </RouteErrorBoundary>
          <Contact />
        </main>
        <Footer />
        <AnalyticsLoader />
      </Router>
    </MotionConfig>
  );
}
