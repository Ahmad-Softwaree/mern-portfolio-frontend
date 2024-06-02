"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-scroll";
import { cn } from "@/utils/cn";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number

    let direction = current - scrollYProgress.getPrevious();

    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
    } else {
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border   rounded-lg  bg-black-500 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-10 py-5  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={50}
            duration={500}
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative text-neutral-50 items-center flex space-x-1  hover:text-neutral-300 !cursor-pointer"
            )}
          >
            <span className="hidden sm:block text-sm !cursor-pointer">
              {navItem.name}
            </span>
            <span className="block sm:hidden !cursor-pointer">
              {navItem.icon}
            </span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
