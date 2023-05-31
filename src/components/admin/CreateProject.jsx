import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createProject } from "../../actions/project";
import { PROJECT_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import { getAllStacks } from "../../actions/stack";
const CreateProject = ({
  getAllStacks,
  stack,
  image: { project },
  createProject,
  project: { projects, createProjectLoading },
  setAdd,
  admin: { user },
}) => {
  const [stacks, setStacks] = useState([]);
  const [{ enTitle, arTitle, krTitle, enType, arType, krType, url }, setInputs] = useState({
    enTitle: "",
    arTitle: "",
    krTitle: "",
    enType: "",
    arType: "",
    krType: "",
    url: "",
  });
  const dispatch = useDispatch();
  const [hover, setHover] = useState("");

  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      createProject({ enTitle, arTitle, krTitle, enType, arType, krType, url, image: project, setInputs, stacks, setStacks });
    }
  };

  useEffect(() => {
    getAllStacks({});
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProject({ enTitle, arTitle, krTitle, enType, arType, krType, url, image: project, setInputs, stacks, setStacks });
      }}
      className="createProject position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Create Project</h1>

      <div className="inner">
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!project ? (
            <>
              <input
                onChange={(e) =>
                  dispatch({
                    type: PROJECT_IMAGE,
                    payload: e.target.files[0],
                  })
                }
                type="file"
                name="project"
                id="projectImage"
                className="projectImage"
              />

              <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />
              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="projectImage">
                <span className="imageUploadButton">Upload an Image</span>
              </label>
              <p className="imageInfo">Image size 200width 200Height</p>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(project)} alt="imageUpload" />
              <span onClick={() => dispatch({ type: PROJECT_IMAGE, payload: null })} className="position-absolute x">
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          )}
        </div>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={enTitle}
          placeholder="Enter the English Title"
          type="text"
          name="enTitle"
          id="enTitle"
          className={enTitle !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={arTitle}
          placeholder="Enter the Arabic Title"
          type="text"
          name="arTitle"
          id="arTitle"
          className={arTitle !== "" ? "activeInputBorder" : ""}
        />{" "}
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={krTitle}
          placeholder="Enter the Kurdish Title"
          type="text"
          name="krTitle"
          id="krTitle"
          className={krTitle !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={enType}
          placeholder="enter english project type"
          name="enType"
          id="enType"
          className={enType !== "" ? "activeInputBorder" : null}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={arType}
          placeholder="enter arabic project type"
          name="arType"
          id="arType"
          className={arType !== "" ? "activeInputBorder" : null}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={krType}
          placeholder="enter kurdish project type"
          name="krType"
          id="krType"
          className={krType !== "" ? "activeInputBorder" : null}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={url}
          placeholder="enter project url"
          name="url"
          id="url"
          className={url !== "" ? "activeInputBorder" : null}
        />
        <div className="flex flex-row justify-left align-center gap-1 w-100 flex-wrap">
          {stack.stacks.map((val, index) => {
            const isStackIncluded = stacks.some((item) => item.stack._id === val._id);
            return (
              <div
                key={index}
                onMouseEnter={() => setHover(val._id)}
                onMouseLeave={() => setHover("")}
                onClick={() => {
                  if (isStackIncluded) {
                    setStacks((prev) => prev.filter((one) => one.stack._id !== val._id));
                  } else {
                    setStacks((prev) => [...prev, { stack: { _id: val._id } }]);
                  }
                }}
                style={
                  isStackIncluded || hover === val._id
                    ? { color: "white", border: `2px solid ${val.color}`, backgroundColor: val.color }
                    : { color: val.color, border: `2px solid ${val.color}`, backgroundColor: "transparent" }
                }
                className="stack"
              >
                {val.name}
              </div>
            );
          })}
        </div>
        <div className="publishAndCancel flex flex-row justify-center align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setAdd(false);
              dispatch({ type: PROJECT_IMAGE, payload: null });
            }}
          >
            Cancel
          </span>
          <button
            type="submit"
            disabled={createProjectLoading}
            className={
              enTitle !== "" &&
              arTitle !== "" &&
              krTitle !== "" &&
              enType !== "" &&
              arType !== "" &&
              krType !== "" &&
              url !== "" &&
              project !== null
                ? "activePublish"
                : "publish"
            }
          >
            {createProjectLoading ? (
              <div className="w-100 loadingSpinner">
                <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  getAllStacks: PropTypes.func.isRequired,
  stack: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  image: state.image,
  admin: state.admin,
  stack: state.stack,
});

const mapDispatchToProps = { createProject, getAllStacks };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
