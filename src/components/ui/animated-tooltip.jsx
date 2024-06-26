"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Image } from "@chakra-ui/react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
export const AnimatedTooltip = ({ link = false, items, git = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map(
        (item, idx) =>
          idx < 8 && (
            <div
              className="-mr-1  relative group bg-niceBlack"
              key={item.name}
              onMouseEnter={() => setHoveredIndex(item.name)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs bg-black-500 flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                  >
                    <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                    <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                    <div className="font-bold text-white relative z-30 text-base">
                      {item.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!git && !link && (
                <Image
                  onMouseMove={handleMouseMove}
                  src={item.image}
                  alt={item.name}
                  className="h-6 w-6  md:h-8 md:w-8 object-cover !m-0 !p-0 object-top rounded-full  border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                />
              )}
              {git && (
                <a target="_blank" href={item.git}>
                  <FaGithub className="text-sm md:text-xl" />
                </a>
              )}
              {link && (
                <a target="_blank" href={item.url}>
                  <FaExternalLinkAlt className="text-sm md:text-xl ml-2" />{" "}
                </a>
              )}
            </div>
          )
      )}
    </>
  );
};
