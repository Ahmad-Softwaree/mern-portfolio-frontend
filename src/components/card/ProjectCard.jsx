import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import { useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import { Type } from "../shared";

export const ProjectCard = ({ item, idx }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      key={item?.id}
      className="relative  col-span-full md:col-span-2 lg:col-span-2  p-2  w-full"
      onMouseEnter={() => setHoveredIndex(item?.id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === item?.id && (
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
          {item.links.length > 0 && (
            <div className="ml-4 flex flex-row gap-4">
              <AnimatedTooltip link={true} items={item.links} />
            </div>
          )}
        </CardTitle>
        <CardDescription
          contributor={item.contributor}
          id={item.id}
          types={item.types}
          stacks={item.stacks}
        >
          {item.desc.substring(0, 120)}... &nbsp;
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
      <h2
        className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}
      >
        {children}
      </h2>
    </>
  );
};
export const CardDescription = ({
  contributor,
  className,
  children,
  stacks,
  types,
  id,
}) => {
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
      <p
        className={cn(
          "mb-8 text-zinc-400 tracking-wide leading-relaxed text-sm"
        )}
      >
        Contributor: {contributor || "My Self"}
      </p>

      <div className="flex flex-row items-center justify-start  w-full gap-2 my-5">
        {types.map((val, index) => {
          return <Type val={val} key={index} />;
        })}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-start  w-full ">
          <AnimatedTooltip items={stacks} />
        </div>
        <Link
          to={`/projects/${id}`}
          className="p-1 px-2 md:px-3 rounded-md text-sm font-bold border-2 border-white-500/[0.2]"
        >
          More{" "}
        </Link>
      </div>
    </>
  );
};

export default ProjectCard;
