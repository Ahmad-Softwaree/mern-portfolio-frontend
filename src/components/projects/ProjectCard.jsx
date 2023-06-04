import React, { useState } from "react";
import { Link } from "@chakra-ui/react";
import { Element } from "react-scroll";
const ProjectCard = ({
  file,
  language,
  img,
  enTitle,
  arTitle,
  krTitle,
  enType,
  arType,
  krType,
  id,
  url,
  stacks,
  onTouchEnd,
  onTouchStart,
  onDragStart,
  onDragEnd,
  onTouchMove,
  index,
}) => {
  const [hover, setHover] = useState("");
  return (
    <Element
      name={`project-${index}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onTouchMove={onTouchMove}
      className={`project-${index} projectCard flex flex-row justify-left align-center flex-wrap ${
        language !== "en" && "flex-row-reverse"
      }`}
    >
      <img src={`${img}`} alt="Project Image" />
      <div className="projectCardFooter flex flex-column justify-left align-start">
        <h1 className="projectTitle">{language === "en" ? enTitle : language === "ar" ? arTitle : krTitle}</h1>

        <p className="projectType">{language === "en" ? enType : language === "ar" ? arType : krType}</p>

        <p className="used">{file.projects.tech} 🔨🖥️</p>
        <div className={`stacks w-100 flex flex-row justify-left align-center gap-1 flex-wrap ${language !== "en" && "justify-right"}`}>
          {stacks.map((val, index) => {
            return (
              <span
                key={index}
                onMouseEnter={() => setHover(val.stack._id)}
                onMouseLeave={() => setHover("")}
                style={
                  hover !== val.stack._id
                    ? { color: "white", border: `2px solid ${val.stack.color}`, backgroundColor: val.stack.color }
                    : { color: val.stack.color, border: `2px solid ${val.stack.color}`, backgroundColor: "transparent" }
                }
                className="stack"
              >
                {val.stack.name}
              </span>
            );
          })}
        </div>

        {url && (
          <Link isExternal href={`${url}`} className="projectLink flex flex-row justify-center align-center">
            {file.projects.preview}
          </Link>
        )}
      </div>
    </Element>
  );
};

export default ProjectCard;
