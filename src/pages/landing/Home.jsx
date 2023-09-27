import React, { useContext, useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";

export default function Home() {
  const {
    state: { language, file },
  } = useContext(LanguageContext);
  //make the background goes with the mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const jobs = useRef();
  const jobsArray = file.home.job;
  const moveBackground = (e) => {
    const { clientX, clientY } = e;
    let timeoutId;
    clearTimeout(timeoutId); // Clear the previous timeout

    timeoutId = setTimeout(() => {
      setMousePosition({ x: clientX, y: clientY });
    }, 100); // Delay in milliseconds
  };

  useEffect(() => {
    const animateJobs = async () => {
      for (let i = 1; i <= jobsArray.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const currentTop = parseInt(jobs.current?.style.top || "0", 10);

        if (i === jobsArray.length) {
          i = 0;
          jobs.current.style.top = 0 + "px";
        } else {
          jobs.current.style.top = currentTop - 60 + "px";
        }
      }
    };

    animateJobs();
  }, [jobs]);

  const { x, y } = mousePosition;
  const blurStyle = { left: `${x - 180}px`, top: `${y - 70}px` };
  return (
    <Element
      data-aos="fade-up"
      className="w-full z-[100] bg-lightBlack"
      name="home"
    >
      <section
        onMouseMove={moveBackground}
        id="home"
        className="relative flex min-h-screen flex-col md:flex-row justify-center items-center gap-10 w-full bg-black text-white flex-wrap overflow-hidden"
      >
        <div
          data-aos="fade-left"
          className="flex flex-col justify-center items-center md:items-start gap-5  w-[95%] md:w-[40%] min-w-[300px] z-[200]"
        >
          <h1 className="font-[500]">{file.home.welcome}</h1>
          <div className="flex flex-row gap-2">
            <h1 className="font-[500]">{file.home.who}</h1>
            <div className="relative text-white">
              <img
                alt="Rect Image"
                src="/images/rect.svg"
                className="absolute inset-0 z-1"
              />
              <h1 className="z-20 relative font-[500]">{file.home.name}</h1>
            </div>
          </div>
          <div className={`relative w-full overflow-hidden h-[60px]`}>
            <div
              ref={jobs}
              className={`absolute top-0 w-full transition-all duration-700 flex flex-col justify-center items-center left-0 ${
                language === "en" ? "md:items-baseline" : "md:items-stretch"
              }`}
            >
              {jobsArray.map((val, index) => {
                return (
                  <h1 className="font-bold h-[60px] text-purple" key={index}>
                    {val}
                  </h1>
                );
              })}
            </div>
          </div>
          <a
            href="/pdf/Resume.pdf"
            download
            className="p-2 px-8 bg-transparent border-2 border-solid border-purple transition-all duration-200 hover:bg-purple text-white rounded-md"
          >
            {file.home.cv}
          </a>
        </div>

        <div
          data-aos="fade-right"
          className="relative w-[95%] md:w-[40%] flex justify-center z-[200]"
        >
          <img
            src="/images/ahmad.svg"
            alt="Ahmad Image"
            className="relative w-full md:max-w-none max-w-[400px]"
          />
        </div>
        <div
          className="w-fit absolute z-[100] flex flex-row justify-center items-center gap-2"
          style={blurStyle}
        >
          <div className="w-[227.11px] h-[222.5px] blur-[115px] bg-green opacity-70 transition-all duration-200 rounded-full"></div>
          <div className="w-[227.11px] h-[222.5px] blur-[115px] bg-purple rotate-180 opacity-70 transition-all duration-200 rounded-full"></div>
        </div>
      </section>
    </Element>
  );
}
