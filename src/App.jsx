import React, { lazy, Suspense } from "react";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Header from "./components/Header";
import Contact from "./components/Contact";
import Loader from "./components/Loader/Loader";
// pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectInfo = lazy(() => import("./pages/ProjectInfo"));

const App = () => {
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Router>
        <Suspense
          fallback={
            <div
              className="fixed top-0 left-0 text-7xl font-semibold flex justify-center
              items-center h-screen w-screen bg-[#1e0b38] z-[1500]"
            >
              <Loader />
            </div>
          }
        >
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project-info/:id" element={<ProjectInfo />} />
          </Routes>
          <Contact />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
