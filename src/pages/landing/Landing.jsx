import React, { useEffect } from "react";
import Blogs from "./Blogs";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";
import Works from "./Works";
import ScrollReveal from "scrollreveal";
import About from "./About";
import Services from "./Services";
import Certificates from "./Certificate";

const Landing = () => {
  //scroll nice animation

  useEffect(() => {
    const pageString = [
      "home",
      "blogs",
      "about",
      "services",
      "skills",
      "projects",
      "certificate",
      "works",
      "contact",
    ];
    pageString.forEach((page, index) => {
      ScrollReveal().reveal(`.${page}`, {
        duration: 2000,
        origin: "bottom",
        distance: "40px",
        viewOffset: "150px",
        reverse: true,
        opacity: 1,
      });
    });
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-left items-center pt-[60px]`}
    >
      <Home />
      <Blogs />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Certificates />
      <Works />
      <Contact />
    </div>
  );
};

export default Landing;
