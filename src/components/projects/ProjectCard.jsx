import React from "react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const ProjectCard = ({ file, language, img, enTitle, arTitle, krTitle, enType, arType, krType, id, url }) => {
  return (
    <div className="projectCard flex flex-column justify-center align-center">
      <img src={`${img}`} alt="" />
      <div className="projectCardFooter flex flex-column justify-center align-center">
        {language === "en" ? (
          <p className="projectTitle">{enTitle}</p>
        ) : language === "ar" ? (
          <p className="projectTitle">{arTitle}</p>
        ) : (
          <p className="projectTitle">{krTitle}</p>
        )}
        {language === "en" ? (
          <p className="projectTitle">{enType}</p>
        ) : language === "ar" ? (
          <p className="projectTitle">{arType}</p>
        ) : (
          <p className="projectTitle">{krType}</p>
        )}

        {url && (
          <Link isExternal href={`${url}`} className="projectLink flex flex-row justify-center align-center">
            Visit
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
