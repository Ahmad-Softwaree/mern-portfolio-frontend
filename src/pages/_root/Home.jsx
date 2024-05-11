import { Hero } from "@/containers/_root";
import About from "@/containers/_root/About";
import Blogs from "@/containers/_root/Blogs";
import Certificates from "@/containers/_root/Certificates";
import Contact from "@/containers/_root/Contact";
import Projects from "@/containers/_root/Projects";
import Services from "@/containers/_root/Services";
import Skills from "@/containers/_root/Skills";
import Work from "@/containers/_root/Works";
import { useState } from "react";
import { Element } from "react-scroll";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const moveBackground = (e) => {
    const { clientX, clientY } = e;
    let timeoutId;
    clearTimeout(timeoutId); // Clear the previous timeout

    timeoutId = setTimeout(() => {
      setMousePosition({ x: clientX, y: clientY });
    }, 100); // Delay in milliseconds
  };
  const { x, y } = mousePosition;
  const blurStyle = { left: `${x - 180}px`, top: `${y - 70}px` };
  return (
    <section>
      <Element
        data-aos="fade-up"
        onMouseMove={moveBackground}
        id="home"
        name="home"
        className="element min-h-screen !overflow-hidden">
        <Hero style={blurStyle} />
      </Element>
      <Element
        data-aos="fade-up"
        id="blogs"
        name="blogs"
        className="element   bg-black-600">
        <div className="home_sections_h1_blur"></div>
        <Blogs />
      </Element>
      <Element
        data-aos="fade-up"
        id="about"
        name="about"
        className="element  bg-black-500">
        <div className="home_sections_h1_blur"></div>
        <About />
      </Element>
      <Element
        data-aos="fade-up"
        id="services"
        name="services"
        className="element bg-black-600">
        <div className="home_sections_h1_blur"></div>
        <Services />
      </Element>
      <Element
        data-aos="fade-up"
        id="skills"
        name="skills"
        className="element bg-black-500">
        <div className="home_sections_h1_blur"></div>
        <Skills />
      </Element>
      <Element
        data-aos="fade-up"
        id="projects"
        name="projects"
        className="element px-[55px] bg-black-600">
        <div className="home_sections_h1_blur"></div>
        <Projects />
      </Element>
      <Element
        data-aos="fade-up"
        id="certificates"
        name="certificates"
        className="element bg-black-500">
        <div className="home_sections_h1_blur"></div>
        <Certificates />
      </Element>
      <Element
        data-aos="fade-up"
        id="works"
        name="works"
        className="element  bg-black-600">
        <div className="home_sections_h1_blur"></div>
        <Work />
      </Element>
      <Element
        data-aos="fade-up"
        id="contact"
        name="contact bg-black-500"
        className="element ">
        <div className="home_sections_h1_blur"></div>
        <Contact />
      </Element>
    </section>
  );
};

export default Home;
