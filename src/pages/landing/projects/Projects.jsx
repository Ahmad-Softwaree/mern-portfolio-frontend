import React, { useRef, useState } from "react";
import { Element } from "react-scroll";
import ProjectCard from "../../../components/projects/ProjectCard";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
const Projects = ({ canSeeProjects, setCanSeeProjects, BACKEND_HOST, t, i18n }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

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

  //fetch projects data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_HOST}/api/project/`);
        const data = res.data;
        if (data.length === 0) setCanSeeProjects(false);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getProjects();
  }, []);
  return (
    <Element className="w-100" name="projects">
      <section id="projects" className="projects flex flex-column justify-left align-center w-100 gap-2">
        <h1 className="heading">{t("nav.projects")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={
            projects.length === 1
              ? "projectsCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"
              : "projectsCards flex flex-row  align-center flex-nowrap w-100  gap-2"
          }
        >
          {loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : (
            <>
              {projects.map((project, index) => {
                return (
                  <ProjectCard
                    BACKEND_HOST={BACKEND_HOST}
                    key={index}
                    img={project.image}
                    enTitle={project.enTitle}
                    arTitle={project.arTitle}
                    krTitle={project.krTitle}
                    id={project._id}
                    url={project.url}
                    i18n={i18n}
                    urlName={project.urlName}
                  />
                );
              })}
            </>
          )}
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

export default Projects;
