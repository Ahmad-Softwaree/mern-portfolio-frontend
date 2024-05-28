import { ENUMs } from "@/lib/enum";
import { ProjectCard } from "../card";

const ProjectGrid = ({ row, page }) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap">
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
