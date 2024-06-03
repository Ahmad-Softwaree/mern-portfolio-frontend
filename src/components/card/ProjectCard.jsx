import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import { useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { cn } from "@/utils/cn";

export const ProjectCard = ({ item, idx }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      key={item?.url}
      className="relative  col-span-full md:col-span-2 lg:col-span-2  p-2  w-full"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-600  block  rounded-xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <Card>
        <CardTitle
          className={`flex flex-row justify-start items-center gap-2`}
          item={item}
        >
          {item.title}
          {"        "}
          {item.gits.length > 0 && (
            <div className="ml-4 flex flex-row gap-4">
              <AnimatedTooltip git={true} items={item.gits} />
            </div>
          )}
          {item.url !== "" && (
            <a target="_blank" href={item.url}>
              <FaExternalLinkAlt className="text-sm md:text-xl ml-2" />{" "}
            </a>
          )}
        </CardTitle>
        <CardDescription types={item.types} stacks={item.stacks}>
          {item.desc}
          &nbsp;
        </CardDescription>
      </Card>
    </div>
  );
};
export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full  overflow-hidden bg-niceBlack border border-white-500/[0.2]  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children, item }) => {
  return (
    <>
      <div className="min-w-full h-[250px] rounded-xl">
        <img
          className="min-w-full h-[250px] rounded-xl object-cover"
          src={`${item.image}`}
          alt="Project Image"
        />
      </div>
      <a href={item.url} target="_blank">
        <h2
          className={cn(
            "text-zinc-100 font-bold tracking-wide mt-4",
            className
          )}
        >
          {children}
        </h2>
      </a>
    </>
  );
};
export const CardDescription = ({ className, children, stacks, types }) => {
  return (
    <>
      <p
        className={cn(
          "mb-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
          className
        )}
      >
        {children}
      </p>
      <div className="w-full flex flex-row justify-between items-center gap-10">
        <div className="flex flex-row items-center justify-start  w-full ">
          <AnimatedTooltip items={stacks} />
        </div>
        <div className="flex flex-row items-center justify-end  w-full ">
          {types.map((val, index) => {
            return (
              <div
                className="p-1 px-3 rounded-md text-sm font-bold border-2 border-white-500/[0.2]"
                key={index}
              >
                {val}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
