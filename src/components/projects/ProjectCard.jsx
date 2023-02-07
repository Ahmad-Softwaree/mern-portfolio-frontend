import React from "react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
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
          <Link
            style={{
              gap: "8px",
            }}
            isExternal
            href={`${url}`}
            className="projectLink flex flex-row justify-center align-center"
          >
            <ExternalLinkIcon mx="2px" />
            {urlName}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
