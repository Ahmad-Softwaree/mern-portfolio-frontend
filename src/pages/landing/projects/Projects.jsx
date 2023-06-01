import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import ProjectCard from "../../../components/projects/ProjectCard";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import { connect } from "react-redux";
import { getAllProjects } from "../../../actions/project";
const Projects = ({ file, language, project, getAllProjects }) => {
  const [pagination, setPagination] = useState(0);
  const [canMove, setCanMove] = useState(true);
  const [active, setActive] = useState(0);
  const projectRef = useRef();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  useEffect(() => {
    getAllProjects({});
  }, []);

  useEffect(() => {
    setPagination(project?.projects?.length);
  }, [project]);

  useEffect(() => {
    let project = document.querySelectorAll(".projectCard")[0];
    projectRef.current?.scrollTo({
      left: (project?.offsetWidth + 36) * active,
      behavior: "smooth",
    });
  }, [active]);

  const onDragEnd = (e) => {
    setDragStart(e.clientX);
    setCanMove(true);
  };
  const onDragStart = (e) => {
    setDragEnd(e.clientX);
    setCanMove(false);
  };

  useEffect(() => {
    if (dragEnd - 60 > dragStart) {
      if (canMove) {
        if (active === project?.projects.length - 1) {
          setActive(0);
        } else {
          setActive((prev) => prev + 1);
        }
      }
    } else if (dragStart - 60 > dragEnd) {
      if (canMove) {
        if (active === 0) {
          setActive(project?.projects.length - 1);
        } else {
          setActive((prev) => prev - 1);
        }
      }
      setCanMove(false);
    }
  }, [dragStart, dragEnd]);

  //make user can change with touch drag
  const onTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    setCanMove(true);
  };
  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setCanMove(false);
  };

  useEffect(() => {
    const scroll = () => {
      if (touchStart - 60 > touchEnd) {
        if (canMove) {
          if (active === project?.projects.length - 1) {
            setActive(0);
          } else {
            setActive((prev) => prev + 1);
          }
        }
      } else if (touchEnd - 60 > touchStart) {
        if (canMove) {
          if (active === 0) {
            setActive(project?.projects.length - 1);
          } else {
            setActive((prev) => prev - 1);
          }
        }
        setCanMove(false);
      }
    };
    scroll();
  }, [touchStart, touchEnd]);

  return (
    <>
      {project.projects.length > 0 && !project.projectLoading ? (
        <Element className="w-100" name="projects">
          <section id="projects" className="projects flex flex-column justify-left align-center w-100 gap-2">
            <h1 className="heading">{file.nav.projects} 🚀</h1>
            <div
              ref={projectRef}
              className={`projectCards flex flex-row justify-left align-center  flex-nowrap w-100  gap-2 ${
                language !== "en" && "flex-row-reverse"
              }`}
            >
              {project.projects.map((project, index) => {
                return (
                  <ProjectCard
                    onTouchEnd={onTouchEnd}
                    onTouchStart={onTouchStart}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    file={file}
                    language={language}
                    key={index}
                    img={project.image}
                    enTitle={project.enTitle}
                    arTitle={project.arTitle}
                    krTitle={project.krTitle}
                    enType={project.enType}
                    arType={project.arType}
                    krType={project.krType}
                    id={project._id}
                    url={project.url}
                    stacks={project.stacks}
                  />
                );
              })}
            </div>
            <div className={`pagination flex flex-row justify-center align-center gap-1 w-100  ${language !== "en" && "flex-row-reverse"}`}>
              <>
                {new Array(pagination)
                  .fill(null)
                  .map((v, i) => i)
                  .map((val, index) => {
                    return (
                      <span
                        onClick={() => setActive(index)}
                        className={`paginationNumber flex flex-row justify-center align-center ${index === active && "active"}`}
                        key={index}
                      >
                        {val + 1}
                      </span>
                    );
                  })}
              </>
            </div>
          </section>
        </Element>
      ) : project.projects.length === 0 && project.projectLoading ? (
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
  project: state.project,
});

export default connect(mapStateToProps, { getAllProjects })(Projects);
