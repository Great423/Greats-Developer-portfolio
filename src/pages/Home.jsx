import React from "react";
// components
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Work from '../components/Work';

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
