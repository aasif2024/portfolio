import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Certificates from "./components/Certificates.jsx";
import Contact from "./components/Contact.jsx";
import CommandPalette from "./components/CommandPalette.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Certificates />
      <Contact />
      <CommandPalette />
    </>
  );
}

