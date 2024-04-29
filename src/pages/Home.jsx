import React, { lazy } from 'react';

// Lazy-loaded components
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Services = lazy(() => import('../components/Services'));
const Work = lazy(() => import('../components/Work'));

// Non-lazy-loaded components
import Nav from '../components/Nav';
import Banner from '../components/Banner';
const Home = () => {
  return (
      <>
        <Nav />
        <Banner />
        <About />
        <Skills />
        <Services />
        <Work />
      </>
  );
};

export default Home;
