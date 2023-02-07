import React from "react";

const WorkCard = ({ id, image, companyName, BACKEND_HOST, enTitle, arTitle, krTitle, from, to, i18n }) => {
  return (
    <div className="workCard position-relative flex flex-column justify-center align-center">
      <div className="workCardBack position-absolute"></div>
      <div className="workCardImageDiv flex flex-row justify-center align-center">
        <img src={`${image}`} alt="workCardImage" className="workCardImage" />
      </div>

      <div className="workCardText position-absolute bottom-4 w-100">
        <h2>{companyName}</h2>
        {i18n.language === "en" ? (
          <span className="workType">{enTitle}</span>
        ) : i18n.language === "ar" ? (
          <span className="workType">{arTitle}</span>
        ) : (
          <span className="workType">{krTitle}</span>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
