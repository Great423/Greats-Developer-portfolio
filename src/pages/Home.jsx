import React, { lazy } from 'react';

// Lazy-loaded components
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Services = lazy(() => import('../components/Services'));
const Work = lazy(() => import('../components/Work'));

// Non-lazy-loaded components (usually smaller ones)
import Nav from '../components/Nav';
import Banner from '../components/Banner';
const Home = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <About />
      <Skills />
      <Services />
      <Work />
    </div>
  );
};

export default Home;
