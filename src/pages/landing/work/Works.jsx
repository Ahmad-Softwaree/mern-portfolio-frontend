import React, { useState, useEffect, useRef } from "react";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import axios from "axios";
import WorkCard from "./WorkCard";
import { Element } from "react-scroll";
import useSize from "../../../hooks/useSize";
const Works = ({ canSeeWorks, setCanSeeWorks, BACKEND_HOST, t, i18n }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  //to make the x scroll not center when width smaller thann 1024px

  useEffect(() => {
    const center = () => {
      if (useSize() !== "xl") {
        document.querySelector(".workCards").style.justifyContent = "unset";
        document.querySelector(".workCards").style.alignItems = "unset";
      } else {
        document.querySelector(".workCards").style.justifyContent = "center";
        document.querySelector(".workCards").style.alignItems = "center";
      }
    };
    center();
    window.addEventListener("resize", center);

    return () => {
      window.removeEventListener("resize", () => {
        //
      });
    };
  }, [window.innerWidth]);

  //mouse dragging event

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.clientX - startX;
    containerRef.current.scrollLeft = x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  //fetch all works useEffect

  useEffect(() => {
    setWorks([]);
    try {
      setLoading(true);
      const getWorks = async () => {
        const res = await axios.get(`${BACKEND_HOST}/api/work/`);
        const data = res.data;
        if (data.length === 0) setCanSeeWorks(false);
        setWorks(data);
        setLoading(false);
      };
      getWorks();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    return () => {
      //
    };
  }, []);

  return (
    <Element name="works" className="w-100">
      <section id="works" className="works flex flex-column justify-left align-center w-100 gap-2">
        <h1 className="heading">{t("work.title")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="workCards flex flex-roww gap-2 flex-nowrap w-100"
        >
          {works.length === 0 && loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : works.length > 0 && !loading ? (
            <>
              {works.map((work, index) => {
                return (
                  <WorkCard
                    id={work._id}
                    key={index}
                    BACKEND_HOST={BACKEND_HOST}
                    image={work.image}
                    companyName={work.companyName}
                    enTitle={work.enTitle}
                    arTitle={work.arTitle}
                    krTitle={work.krTitle}
                    from={work.from}
                    to={work.to}
                    i18n={i18n}
                  />
                );
              })}
            </>
          ) : null}
        </div>

        <div className="seeMoreAdvice flex flex-row justify-center align-center w-100  gap-1">
          <span>
            <i className="fa-solid fa-arrow-pointer"></i>
          </span>
          <small>{t("drag")}</small>
        </div>
      </section>
    </Element>
  );
};

export default Works;
