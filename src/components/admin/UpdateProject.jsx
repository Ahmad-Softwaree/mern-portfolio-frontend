import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProject } from "../../actions/project";
import { Spinner } from "@chakra-ui/react";
import { PROJECT_UPDATE_IMAGE } from "../../actions/types";
const UpdateProject = ({
  enTitle,
  arTitle,
  krTitle,
  enType,
  arType,
  krType,
  url,
  id,
  oldImage,
  updateProject,
  oldStacks,
  image,
  setUpdate,
  stack,
  project: { updateProjectLoading },
}) => {
  const [imageChanged, setImageChanged] = useState(false);
  const [stacks, setStacks] = useState(oldStacks);

  const [inputs, setInputs] = useState({
    enTitle: enTitle,
    arTitle: arTitle,
    krTitle: krTitle,
    enType: enType,
    arType: arType,
    krType: krType,
    url: url,
  });
  const dispatch = useDispatch();
  const [hover, setHover] = useState("");

  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      updateProject({
        enTitle: inputs.enTitle,
        arTitle: inputs.arTitle,
        krTitle: inputs.krTitle,
        enType: inputs.enType,
        arType: inputs.arType,
        krType: inputs.krType,
        url: inputs.url,
        image: image.updateProject,
        projectId: id,
        setUpdate,
        oldImage,
        setInputs,
        imageChanged,
        stacks,
        setStacks,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateProject({
          enTitle: inputs.enTitle,
          arTitle: inputs.arTitle,
          krTitle: inputs.krTitle,
          enType: inputs.enType,
          arType: inputs.arType,
          krType: inputs.krType,
          url: inputs.url,
          image: image.updateProject,
          projectId: id,
          setUpdate,
          oldImage,
          setInputs,
          imageChanged,
          stacks,
          setStacks,
        });
      }}
      className="createProject position-fixed flex flex-column justify-center align-center w-100 gap-2 update"
    >
      <h1>Update Project</h1>
      <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
        {image.updateProject ? (
          <div className="URLImage position-relative">
            <img className="URLImage" src={URL.createObjectURL(image.updateProject)} alt="imageUpload" />
            <span
              onClick={() => {
                dispatch({ type: BLOG_UPDATE_IMAGE, payload: null });
                setImageChanged(false);
              }}
              className="position-absolute x"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        ) : (
          <>
            <input
              onChange={(e) => {
                dispatch({
                  type: PROJECT_UPDATE_IMAGE,
                  payload: e.target.files[0],
                });
                setImageChanged(true);
              }}
              type="file"
              name="project"
              id="updateProject"
              className="projectImage"
            />

            <img className="URLImage" src={`${oldImage}`} alt="imageUpload" />

            <label
              className="blogImageUploaderLabel projectImageUploaderLabel flex justify-center align-center flex-row"
              htmlFor="updateProject"
            >
              <div className="editButton flex flex-row align-center  justify-center">
                <img src="/images/edit.svg" alt="editImage" className="editImage" />
                <span>Edit</span>
              </div>
            </label>
          </>
        )}
      </div>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.enTitle}
        placeholder="Enter the English Title"
        type="text"
        name="enTitle"
        id="enTitle"
        className={inputs.enTitle !== "" ? "activeInputBorder" : ""}
      />
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.arTitle}
        placeholder="Enter the Arabic Title"
        type="text"
        name="arTitle"
        id="arTitle"
        className={inputs.arTitle !== "" ? "activeInputBorder" : ""}
      />{" "}
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.krTitle}
        placeholder="Enter the Kurdish Title"
        type="text"
        name="krTitle"
        id="krTitle"
        className={inputs.krTitle !== "" ? "activeInputBorder" : ""}
      />
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.enType}
        placeholder="enter english project type"
        name="enType"
        id="enType"
        className={inputs.enType !== "" ? "activeInputBorder" : null}
      />
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.arType}
        placeholder="enter arabic project type"
        name="arType"
        id="arType"
        className={inputs.arType !== "" ? "activeInputBorder" : null}
      />
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.krType}
        placeholder="enter kurdish project type"
        name="krType"
        id="krType"
        className={inputs.krType !== "" ? "activeInputBorder" : null}
      />
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputs.url}
        placeholder="enter project url"
        name="url"
        id="url"
        className={inputs.url !== "" ? "activeInputBorder" : null}
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
            setUpdate(false);
            dispatch({ type: PROJECT_UPDATE_IMAGE, payload: null });
          }}
        >
          Cancel
        </span>
        <button
          type="submit"
          disabled={updateProjectLoading}
          className={
            inputs.enTitle !== "" &&
            inputs.arTitle !== "" &&
            inputs.krTitle !== "" &&
            inputs.enType !== "" &&
            inputs.arType !== "" &&
            inputs.krType !== "" &&
            inputs.url !== "" &&
            (image.updateProject !== null || oldImage !== null)
              ? "activePublish"
              : "publish"
          }
        >
          {updateProjectLoading ? (
            <div className="w-100 loadingSpinner">
              <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
            </div>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};
UpdateProject.propTypes = {
  admin: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  stack: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  project: state.project,
  image: state.image,
  stack: state.stack,
});

const mapDispatchToProps = { updateProject };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
