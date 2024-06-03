import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FaCode } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@chakra-ui/react";

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white-500/[0.2]  flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-white-500/[0.2] p-2  items-center space-x-2 bg-black-900 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-white-500/[0.2]  flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-white-500/[0.2] p-2  items-start space-x-2 bg-black-500"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-white-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white-500/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-black-500"
      >
        <p className="text-xs text-white-500">Use Next.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  const tabs = [
    {
      title: "Education",
      description: "Salahadin University, Software Engineering",
      className: "md:col-span-2",
      header: (
        <img
          className="max-h-[150px] object-cover brightness-50 transition-all duration-200 hover:brightness-100 rounded-md"
          src="/images/education.avif"
        />
      ),
      icon: <MdCastForEducation className="h-4 w-4 text-white-500" />,
    },
    {
      title: "Experience",
      description: "Developing Hundreds of MERN Projects",
      className: "md:col-span-1",
      header: <SkeletonFive />,
      icon: <FaCode className="h-4 w-4 text-white-500" />,
    },
    {
      title: "Experience",
      description: "Managing Projects With Scrum Techniques",
      className: "md:col-span-1",
      header: (
        <img
          className="max-h-[150px] object-cover brightness-50 transition-all duration-200 hover:brightness-100 rounded-md"
          src="/images/manager.avif"
        />
      ),
      icon: <SiGoogletagmanager className="h-4 w-4 text-white-500" />,
    },
    {
      title: "About Me",
      description: "Ahmad From Kurdistan Iraq, 21 Years Old",
      className: "md:col-span-2",
      header: <SkeletonTwo />,
      icon: <MdCastForEducation className="h-4 w-4 text-white-500" />,
    },
  ];

  return (
    <BentoGrid className="w-full mx-auto  md:auto-rows-[20rem]">
      {tabs.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
