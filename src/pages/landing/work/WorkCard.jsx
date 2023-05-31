import React from "react";

const WorkCard = ({ id, image, company, file, language, enTitle, arTitle, krTitle, from, to }) => {
  return (
    <div className="workCard flex flex-column justify-left align-center gap-1">
      <img src={`${image}`} alt="workCardImage" className="workCardImage" />
      <p>{language === "en" ? enTitle : language === "ar" ? arTitle : krTitle}</p>
      <p>{company}</p>
    </div>
  );
};

export default WorkCard;
