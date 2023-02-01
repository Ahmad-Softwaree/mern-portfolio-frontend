import React from "react";

const ProjectCard = ({ BACKEND_HOST, img, enTitle, arTitle, krTitle, id, url, i18n }) => {
  return (
    <div className="projectCard flex flex-column justify-center align-center">
      <img src={`${BACKEND_HOST}/public/images/projects/${img}`} alt="" />
      <div className="projectCardFooter flex flex-column justify-center align-center gap-1">
        {i18n.language === "en" ? (
          <p className="projectTitle">{enTitle}</p>
        ) : i18n.language === "ar" ? (
          <p className="projectTitle">{arTitle}</p>
        ) : (
          <p className="projectTitle">{krTitle}</p>
        )}

        {url && (
          <a target="_blank" href={`${url}`} className="projectLink">
            {url}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
