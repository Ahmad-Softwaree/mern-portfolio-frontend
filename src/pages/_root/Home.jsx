import { FloatingNav } from "@/components/ui/floating-navbar";

import { FaHome } from "react-icons/fa";
import { Element } from "react-scroll";
import { FaList } from "react-icons/fa6";
import { PiProjectorScreenChart } from "react-icons/pi";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { About, Hero, Services, Skills } from "@/containers";
import Projects from "@/containers/Projects";
import Certificates from "@/containers/Certificates";
import Works from "@/containers/Works";
import Contact from "@/containers/Contact";

const Home = () => {
  return (
    <section>
      <FloatingNav
        navItems={[
          {
            link: "home",
            name: "home",
            icon: <FaHome />,
          },

          {
            link: "skills",
            name: "skills",
            icon: <FaList />,
          },
          {
            link: "projects",
            name: "projects",
            icon: <PiProjectorScreenChart />,
          },

          {
            link: "contact",
            name: "contact",
            icon: <PiContactlessPaymentFill />,
          },
        ]}
      />
      <Element
        data-aos="fade-up"
        id="home"
        name="home"
        className="element min-h-[800px] !overflow-hidden"
      >
        <Hero />
      </Element>
      <Element
        data-aos="fade-up"
        id="about"
        name="about"
        className="element  bg-niceBlack overflow-hidden"
      >
        <About />
      </Element>{" "}
      <Element
        data-aos="fade-up"
        id="services"
        name="services"
        className="element bg-niceBlack"
      >
        <Services />
      </Element>
      <Element
        data-aos="fade-up"
        id="skills"
        name="skills"
        className="element bg-niceBlack"
      >
        <Skills />
      </Element>
      <Element
        data-aos="fade-up"
        id="projects"
        name="projects"
        className="element px-[20px] md:px-[55px] bg-niceBlack"
      >
        <Projects />
      </Element>{" "}
      <Element
        data-aos="fade-up"
        id="certificates"
        name="certificates"
        className="element bg-niceBlack"
      >
        <Certificates />
      </Element>{" "}
      <Element
        data-aos="fade-up"
        id="works"
        name="works"
        className="element  !min-h-fit  bg-black-600"
      >
        <Works />
      </Element>
      <Element
        data-aos="fade-up"
        id="contact"
        name="contact bg-niceBlack"
        className="element "
      >
        <Contact />
      </Element>
    </section>
  );
};

export default Home;
