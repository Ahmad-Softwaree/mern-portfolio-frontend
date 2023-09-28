import React, { Fragment, useContext, useEffect } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";
import { AlertContext } from "../../context/AlertContext";
import { CertificateContext } from "../../context/CertificateContext";
import { getAllCertificates } from "../../context/actions/certificateAction";
import NoData from "../../components/global/NoData";
import CertificateCard from "../../components/certificate/CertificateCard";
import LoadingCertificateSkeleton from "../../components/loading/LoadingCertificateSkeleton";
export default function Certificates() {
  const {
    state: { language, file },
  } = useContext(LanguageContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: certificateDispatch,
    state: { certificates, getCertificatesLoading },
  } = useContext(CertificateContext);

  useEffect(() => {
    getAllCertificates(certificateDispatch, alertDispatch);
  }, [certificateDispatch]);
  return (
    <Element
      data-aos="fade-up"
      className="w-full bg-niceBlack"
      name="certificate"
    >
      <section
        id="certificate"
        className={`flex flex-col justify-left items-center w-full px-5 md:px-10 overflow-hidden`}
      >
        <h1 className="font-bold text-white">Certificates</h1>

        <div
          className={`flex flex-col gap-10 justify-center items-center w-full py-[30px] ${
            language !== "en" && "flex-row-reverse"
          }`}
        >
          {getCertificatesLoading ? (
            <LoadingCertificateSkeleton card={4} />
          ) : certificates.length > 0 ? (
            <Fragment>
              {certificates.map((val, index) => {
                return <CertificateCard index={index} key={index} val={val} />;
              })}
            </Fragment>
          ) : (
            <NoData />
          )}
        </div>
      </section>
    </Element>
  );
}
