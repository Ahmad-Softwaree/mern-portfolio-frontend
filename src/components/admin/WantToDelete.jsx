import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteBlog } from "../../actions/blog";
import { deleteProject } from "../../actions/project";
import { deleteWork } from "../../actions/work";
import { deleteStack } from "../../actions/stack";

export const WantToDelete = ({ setWantToDelete, id, image, deleteBlog, deleteProject, deleteWork, method, deleteStack }) => {
  return (
    <div className="position-fixed wantToDelete flex flex-column justify-left align-center gap-1">
      <p>Are you sure you want to delete?</p>
      <div className="flex flex-row justify-center align-center gap-2">
        <button
          onClick={() =>
            method === "blog"
              ? deleteBlog({ blogId: id, image, setWantToDelete })
              : method === "project"
              ? deleteProject({ projectId: id, image, setWantToDelete })
              : method === "work"
              ? deleteWork({ workId: id, image, setWantToDelete })
              : method === "stack"
              ? deleteStack({ stackId: id, setWantToDelete })
              : null
          }
          className="yes"
        >
          Yes
        </button>
        <button onClick={() => setWantToDelete(false)} className="no">
          No
        </button>
      </div>
    </div>
  );
};

WantToDelete.propTypes = {};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = { deleteBlog, deleteProject, deleteWork, deleteStack };

export default connect(mapStateToProps, mapDispatchToProps)(WantToDelete);
