import useDocumentTitle from "../hooks/useDocumentTitle";
import Hero from "../components/sections/Hero";
import SelectedWork from "../components/sections/SelectedWork";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import EducationAchievements from "../components/sections/EducationAchievements";
import Capabilities from "../components/sections/Capabilities";

// Sections load with the page (not lazily) so hash links such as /#experience
// can scroll to them as soon as the route renders.
export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Skills />
      <EducationAchievements />
      <Capabilities />
    </>
  );
}
