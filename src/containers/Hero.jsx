import React, { useContext, useEffect, useRef, useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import MagicButton from "@/components/ui/MagicButton";
import { FlipWords } from "@/components/ui/flip-words";
import { Link } from "react-scroll";
import { FaLocationArrow } from "react-icons/fa";

export default function Hero() {
  const words = ["React.js", "Laravel", "Next.js", "Vue.js"];
  return (
    <>
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />

      <div className="h-[50rem] w-full  bg-white  bg-grid-white-100/[0.03]  flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div
        data-aos="fade-left"
        className="relative flex flex-col justify-center items-center  gap-5  w-[95%] min-w-[300px] z-[1200]"
      >
        <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
          Dynamic Web Magic with Next.js
        </h2>
        <TextGenerateEffect
          className="text-center text-[40px] md:text-5xl lg:text-6xl"
          words={`Transforming Concepts into Seamless User Experiences`}
        />
        <div className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2x1">
          {" "}
          Hi, I&apos;m Ahmad, a
          <FlipWords words={words} /> <br />
          Developer based in Kurdistan.
        </div>

        <Link
          spy={true}
          smooth={true}
          hashSpy={true}
          offset={50}
          duration={500}
          to={`projects`}
        >
          <MagicButton
            icon={<FaLocationArrow />}
            position="right"
            title={`Show My Works`}
          />
        </Link>
      </div>
    </>
  );
}
