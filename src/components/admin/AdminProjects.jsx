import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllProjects } from "../../actions/project";
import { Spinner } from "@chakra-ui/react";
import AdminProject from "./AdminProject";
import Opacity from "../Opacity";
import CreateProject from "./CreateProject";

export const AdminProjects = ({ project: { projects, projectLoading }, getAllProjects }) => {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllProjects({});
  }, []);
  return (
    <div className="admin_projects  flex flex-column justify-center align-center gap-1">
      <div className="flex flex-row justify-center align-center gap-1 w-100">
        <h1>Projects</h1>
        <button className="uploadButton flex flex-row justify-center align-center" onClick={() => setAdd(true)}>
          <i className="fa-solid fa-upload"></i>
          <span>Upload</span>
        </button>
      </div>

      {add && (
        <>
          <Opacity />
          <CreateProject setAdd={setAdd} />
        </>
      )}

      {projectLoading && <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} />}
      {!projectLoading && projects.length > 0 && (
        <div className="projects w-100 flex flex-column justify-left align-center gap-1">
          <div className="projectCard blogTable flex flex-row justify-between align-center w-100">
            <span className="tableIndex">Id</span>
            <span className="tableIndex">Title</span>

            <div className="flex flex-row justify-center align-center gap-2">
              <span className="tableOperation">Update</span>
              <span className="tableOperation">Delete</span>
            </div>
          </div>
          <div className="theProjects flex flex-column justify-left align-center gap-1 w-100">
            {projects?.map((project, index) => {
              return (
                <AdminProject
                  index={index}
                  key={index}
                  id={project._id}
                  enTitle={project.enTitle}
                  krTitle={project.krTitle}
                  arTitle={project.arTitle}
                  enType={project.enType}
                  krType={project.krType}
                  arType={project.arType}
                  image={project.image}
                  url={project.url}
                />
              );
            })}
          </div>
        </div>
      )}
      {!projectLoading && projects.length === 0 && <span className="no_project">There is no project</span>}
    </div>
  );
};

AdminProjects.propTypes = {
  project: PropTypes.object.isRequired,
  getAllProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

const mapDispatchToProps = { getAllProjects };

export default connect(mapStateToProps, mapDispatchToProps)(AdminProjects);
