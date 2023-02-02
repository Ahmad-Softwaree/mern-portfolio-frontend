import React from "react";

const ProjectCard = ({ BACKEND_HOST, img, enTitle, arTitle, krTitle, id, url, i18n, urlName }) => {
  return (
    <div className="projectCard flex flex-column justify-center align-center">
      <img src={`${img}`} alt="" />
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
            {urlName}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
