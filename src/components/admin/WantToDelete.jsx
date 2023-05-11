import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteBlog } from "../../actions/blog";
import { deleteProject } from "../../actions/project";
import { deleteWork } from "../../actions/work";

export const WantToDelete = ({ setWantToDelete, id, image, deleteBlog, deleteProject, deleteWork, blog, work }) => {
  return (
    <div className="position-fixed wantToDelete flex flex-column justify-left align-center gap-1">
      <p>Are you sure you want to delete?</p>
      <div className="flex flex-row justify-center align-center gap-2">
        <button
          onClick={() =>
            blog
              ? deleteBlog({ blogId: id, image, setWantToDelete })
              : !work
              ? deleteProject({ projectId: id, image, setWantToDelete })
              : deleteWork({ workId: id, image, setWantToDelete })
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

const mapDispatchToProps = { deleteBlog, deleteProject, deleteWork };

export default connect(mapStateToProps, mapDispatchToProps)(WantToDelete);
