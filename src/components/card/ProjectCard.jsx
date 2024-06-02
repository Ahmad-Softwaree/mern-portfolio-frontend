import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Link } from "react-router-dom";
import { Stack } from "../shared";

export const ProjectCard = ({ val, index }) => {
  return (
    <div
      className={`relative bg-black-800 h-[540px] w-full md:w-[500px] flex flex-col justify-center items-center gap-5  flex-wrap  shadow-xl p-5 rounded-lg `}
    >
      <div className="flex flex-col justify-left items-start gap-5 w-full rounded-xl">
        <Link
          className="min-w-full h-[250px] rounded-xl"
          to={`/projects/${val._id}`}
        >
          {" "}
          <img
            className="min-w-full h-[250px] rounded-xl object-cover"
            src={`${val.image}`}
            alt="Project Image"
          />
        </Link>

        <div className="flex flex-col justify-left items-center gap-1 w-full">
          <Link
            to={`/projects/${val._id}`}
            className="text-white text-body1-semibold md:text-sub-heading3-semibold hover:text-primary-500 transition-all duration-200  font-bold w-full"
          >
            {lang === "en"
              ? val.enTitle
              : lang === "ar"
              ? val.arTitle
              : val.krTitle}
            {"        "}
            <OpenInNewIcon className="text-white" fontSize="14px" />
          </Link>
          <h2 className=" text-text2-light md:text-text1-light  w-full">
            {val.desc.substring(0, 60).concat("...")}
            &nbsp;
            <Link
              to={`/projects/${val._id}`}
              className="!text-[14px] text-primary-500"
            >
              More
            </Link>
          </h2>
        </div>
      </div>

      <div className="w-full flex items-center bg-transparent">
        {val.stacks.length > 0 &&
          val.stacks.map((one, index) => {
            return (
              <Stack
                to={`/projects?stack=${one?._id}`}
                val={one}
                index={index}
                key={one._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProjectCard;
