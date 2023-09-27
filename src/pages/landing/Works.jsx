import React, { useContext, useEffect, Fragment } from "react";
import WorkCard from "../../components/work/WorkCard";
import { Element } from "react-scroll";
import { AlertContext } from "../../context/AlertContext";
import { WorkContext } from "../../context/WorkContext";
import { getAllWorks } from "../../context/actions/workAction";
import { LanguageContext } from "../../context/LanguageContext";
import NoData from "../../components/global/NoData";
import LoadingWorkSkeleton from "../../components/loading/LoadingWorkSkeleton";
export default function Work() {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: workDispatch,
    state: { works, getWorksLoading },
  } = useContext(WorkContext);
  useEffect(() => {
    getAllWorks(workDispatch, alertDispatch);
  }, [workDispatch]);

  return (
    <Element data-aos="fade-up" className="w-full bg-black" name="works">
      <section
        id="works"
        className="works flex flex-col justify-left items-center w-full gap-2 px-10 overflow-auto"
      >
        <h1 className="text-white font-bold">{file.nav.works}</h1>

        <div
          className={`flex flex-row justify-center md:justify-left align-center  flex-wrap w-full  gap-[50px] py-[50px] ${
            language !== "en" && "flex-row-reverse"
          }`}
        >
          {getWorksLoading ? (
            <LoadingWorkSkeleton card={3} />
          ) : works.length > 0 ? (
            <Fragment>
              {works.map((val, index) => {
                return <WorkCard key={index} val={val} />;
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
