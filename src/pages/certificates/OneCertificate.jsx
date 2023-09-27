import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { CertificateContext } from "../../context/CertificateContext";
import { getOneCertificate } from "../../context/actions/certificateAction";
import { AlertContext } from "../../context/AlertContext";
import DateMoment from "../../components/global/DateMoment";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import LoadingOneCertificateSkeleton from "../../components/loading/LoadingOneCertificateSkeleton";
export default function OneCertificate() {
  const { certificate_id } = useParams();
  const {
    state: { file, language },
  } = useContext(LanguageContext);

  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: certificateDispatch,
    state: { getOneCertificateLoading, certificate },
  } = useContext(CertificateContext);

  useEffect(() => {
    getOneCertificate(certificateDispatch, alertDispatch, certificate_id);
  }, [certificateDispatch]);
  return (
    <section className="relative w-full flex flex-col justify-center items-center gap-5 min-h-screen text-white p-10 pb-[200px]">
      {getOneCertificateLoading ? (
        <LoadingOneCertificateSkeleton />
      ) : (
        <Fragment>
          <div className="flex flex-col justify-left items-start gap-[30px] w-full">
            <img
              className="w-full h-[340px] md:h-[450px] rounded-md object-contain border-2 border-solid border-niceBlack"
              src={`${certificate.imageURL}`}
              alt="Certificate Image"
            />
            <div className="w-full flex flex-row justify-between items-center gap-5">
              <span className="text-white font-bold !text-[14px] md:!text-[16px]">
                Date: <DateMoment date={certificate.date} />
              </span>
              {certificate.url && (
                <a
                  target="_blank"
                  href={`${certificate.url}`}
                  className="flex flex-row gap-1 justify-center items-center text-white  px-2 border-2 border-solid border-purple transition-all duration-300 hover:bg-purple hover:text-white rounded-md cursor-pointer p-1"
                >
                  <span className="!text-[14px] text-white"> Course Link</span>
                  <OpenInNewIcon className="text-white" fontSize="14px" />
                </a>
              )}
            </div>

            <div className="flex flex-col justify-left items-center gap-1 w-full">
              <h2 className="text-white !text-[16px] md:!text-[18px] font-[500] w-full">
                {language === "en"
                  ? certificate.enTitle
                  : language === "ar"
                  ? certificate.arTitle
                  : certificate.krTitle}
              </h2>
              <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
                {language === "en"
                  ? certificate.enDesc
                  : language === "ar"
                  ? certificate.arDesc
                  : certificate.krDesc}
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white">
                <i className="fa-solid fa-diagram-certificate"></i>{" "}
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white">
                Types
              </span>
            </div>
            {certificate.types.map((val, index) => {
              return (
                <span
                  key={index}
                  className="p-1 px-2 border-[3px] hover:bg-lightBlack border-solid border-lightBlack transition-all duration-300 w-fit  text-white !text-[12px] md:!text-[14px] rounded-md bg-transparent  cursor-pointer"
                >
                  {val.type.enName}
                </span>
              );
            })}
          </div>

          <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
            <div className="w-full flex flex-row justify-left items-center gap-5">
              <span className="!text-[16px] md:!text-[18px] text-white">
                <i className="fa-solid fa-cubes"></i>
              </span>
              <span className="!text-[16px] md:!text-[18px] text-white">
                Stacks
              </span>
            </div>

            {certificate.stacks.map((val, index) => {
              return (
                <span
                  key={index}
                  style={{ borderColor: val.stack.color }}
                  className={`p-1 px-2 border-[3px] hover:bg-lightBlack border-solid  transition-all duration-300 w-fit text-white !text-[14px] rounded-md bg-transparent  cursor-pointer`}
                >
                  {val.stack.name}
                </span>
              );
            })}
          </div>
        </Fragment>
      )}
    </section>
  );
}
