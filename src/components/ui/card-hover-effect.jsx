import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AnimatedTooltip } from "./animated-tooltip";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-6  py-10",
        className
      )}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={item?.url}
            className="relative group col-span-full md:col-span-2 lg:col-span-2 block p-2 h-full w-full"
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
              <CardTitle item={item}>
                {item.title}
                {"        "}
                <OpenInNewIcon className="text-white" fontSize="14px" />
              </CardTitle>
              <CardDescription stacks={item.stacks}>
                {item.desc.substring(0, 60).concat("...")}
                &nbsp;
                <div className="!text-[14px] text-primary-500">More</div>
              </CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full  overflow-hidden bg-black-500 border border-transparent  relative z-20",
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
export const CardDescription = ({ className, children, stacks }) => {
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
      <div className="flex flex-row items-center justify-start mb-10 w-full">
        <AnimatedTooltip items={stacks} />
      </div>
    </>
  );
};
