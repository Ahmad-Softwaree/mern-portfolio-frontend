import { cn } from "@/utils/cn";

import { ProjectCard } from "../card";
export const HoverEffect = ({ items, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-6  py-10 ",
        className
      )}
    >
      {items.map((item, idx) => {
        return <ProjectCard key={idx} item={item} />;
      })}
    </div>
  );
};
