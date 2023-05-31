import React, { useState, useRef, useEffect } from "react";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import WorkCard from "./WorkCard";
import { Element } from "react-scroll";
import { connect } from "react-redux";
import { getAllWorks } from "../../../actions/work";
const Works = ({ file, language, work, getAllWorks }) => {
  useEffect(() => {
    getAllWorks({});
  }, []);

  return (
    <>
      {work.works.length > 0 && !work.workLoading ? (
        <Element name="works" className="w-100">
          <section id="works" className="works flex flex-column justify-left align-center w-100 gap-2">
            <h1 className="heading">{file.work.title}</h1>
            <div className={"workCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"}>
              {work.works.map((work, index) => {
                return (
                  <WorkCard
                    file={file}
                    company={work.company}
                    enTitle={work.enTitle}
                    arTitle={work.arTitle}
                    krTitle={work.krTitle}
                    language={language}
                    id={work._id}
                    key={index}
                    image={work.image}
                  />
                );
              })}
            </div>
          </section>
        </Element>
      ) : work.works.length === 0 && work.workLoading ? (
        <div style={{ overflowX: "hidden" }} className="flex flex-row justify-center align-center w-100 gap-5">
          <LoadingBlogSkeleton />
          <LoadingBlogSkeleton />
          <LoadingBlogSkeleton />
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  work: state.work,
});

export default connect(mapStateToProps, { getAllWorks })(Works);
