import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import AmbientBackground from "./components/layout/AmbientBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
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

function RouteFallback() {
  return (
    <div className="grid min-h-[80vh] place-items-center pt-[var(--header-h)]" role="status" aria-label="Loading">
      <Loader />
    </div>
  );
}

const page = (element) => (
  <PageTransition>
    <Suspense fallback={<RouteFallback />}>{element}</Suspense>
  </PageTransition>
);

function AnimatedRoutes() {
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
        <Route path="/" element={page(<Home />)} />
        <Route path="/projects" element={page(<Projects />)} />
        <Route path="/project-info/:id" element={page(<ProjectInfo />)} />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Fetch the other route chunks once the first page has settled, so
  // navigating never has to wait on the network.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1200));
    const handle = idle(() => {
      loadHome();
      loadProjects();
      loadProjectInfo();
    });
    return () => (window.cancelIdleCallback || window.clearTimeout)(handle);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollManager />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <Header />
        <main id="main" tabIndex={-1} className="relative outline-none">
          <AnimatedRoutes />
          <Contact />
        </main>
        <Footer />
      </Router>
    </MotionConfig>
  );
}
