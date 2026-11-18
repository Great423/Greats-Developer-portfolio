import { lazy } from 'react';

// Lazy-loaded components
const About = lazy(() => import('../components/About'));
const EducationAchievements = lazy(() => import('../components/EducationAchievements'));
const Experience = lazy(() => import('../components/Experience'));
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
        <EducationAchievements />
        <Experience />
        <Skills />
        <Services />
        <Work />
      </>
  );
};

export default Home;
