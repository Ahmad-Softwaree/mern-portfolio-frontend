import React from "react";

const ProjectCard = ({ BACKEND_HOST, img, title, id, url }) => {
  return (
    <div className="projectCard flex flex-column justify-center align-center">
      <img src={`${BACKEND_HOST}/public/images/projects/${img}`} alt="" />
      <div className="projectCardFooter flex flex-column justify-center align-center gap-1">
        <p className="projectTitle">{title}</p>
        <a target="_blank" href={`${url}`} className="projectLink">
          {url}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
