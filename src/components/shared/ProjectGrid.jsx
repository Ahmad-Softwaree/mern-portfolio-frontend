import { ENUMs } from "@/lib/enum";
import { ProjectCard } from "../card";

const ProjectGrid = ({ row, page }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-10">
      {row.map((val, index) => {
        return (
          <ProjectCard
            key={index}
            index={index + page * ENUMs.PAGINATION}
            val={val}
          />
        );
      })}
    </div>
  );
};

export default ProjectGrid;
