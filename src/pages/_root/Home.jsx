import { FloatingNav } from "@/components/ui/floating-navbar";
import { homeLinks } from "@/constants";
import { Hero } from "@/containers/_root";
import About from "@/containers/_root/About";
import Blogs from "@/containers/_root/Blogs";
import Certificates from "@/containers/_root/Certificates";
import Contact from "@/containers/_root/Contact";
import Projects from "@/containers/_root/Projects";
import Services from "@/containers/_root/Services";
import Skills from "@/containers/_root/Skills";
import Work from "@/containers/_root/Works";
import { FaHome } from "react-icons/fa";
import { Element } from "react-scroll";
import { FaList } from "react-icons/fa6";
import { PiProjectorScreenChart } from "react-icons/pi";
import { PiContactlessPaymentFill } from "react-icons/pi";

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
        className="element min-h-screen !overflow-hidden"
      >
        <Hero />
      </Element>
      {/* <Element
        data-aos="fade-up"
        id="blogs"
        name="blogs"
        className="element   bg-black-600"
      >
        <div className="home_sections_h1_blur"></div>
        <Blogs />
      </Element> */}
      <Element
        data-aos="fade-up"
        id="about"
        name="about"
        className="element  bg-niceBlack"
      >
        <About />
      </Element>
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
      </Element>
      <Element
        data-aos="fade-up"
        id="certificates"
        name="certificates"
        className="element bg-niceBlack"
      >
        <Certificates />
      </Element>
      <Element
        data-aos="fade-up"
        id="works"
        name="works"
        className="element  !min-h-fit  bg-black-600"
      >
        <Work />
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
