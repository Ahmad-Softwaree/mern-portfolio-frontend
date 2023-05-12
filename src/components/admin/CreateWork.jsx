import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createWork } from "../../actions/work";
import { BLOG_IMAGE, WORK_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";

const CreateWork = ({ image: { work }, createWork, work: { works, createWorkLoading }, setAdd, admin: { user } }) => {
  const [{ enTitle, arTitle, krTitle, company, from, to }, setInputs] = useState({
    enTitle: "",
    krTitle: "",
    arTitle: "",
    company: "",
    from: "",
    to: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      createWork({ enTitle, arTitle, krTitle, company, from, to, image: work, userId: user._id, setInputs });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createWork({ enTitle, arTitle, krTitle, company, from, to, image: work, userId: user._id, setInputs });
      }}
      className="createWork position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Create Work</h1>

      <div className="inner">
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!work ? (
            <>
              <input
                onChange={(e) =>
                  dispatch({
                    type: WORK_IMAGE,
                    payload: e.target.files[0],
                  })
                }
                type="file"
                name="work"
                id="workImage"
                className="workImage"
              />

              <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />
              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="workImage">
                <span className="imageUploadButton">Upload an Image</span>
              </label>
              <p className="imageInfo">Image size 1215width 481Height</p>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(work)} alt="imageUpload" />
              <span onClick={() => dispatch({ type: WORK_IMAGE, payload: null })} className="position-absolute x">
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
        />
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
          value={company}
          placeholder="Enter the Company"
          type="text"
          name="company"
          id="company"
          className={company !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={from}
          placeholder="Enter Start Date"
          type="date"
          name="from"
          id="from"
          className={from !== "" ? "activeInputBorder" : ""}
        />

        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={to}
          placeholder="Enter End Date"
          type="date"
          name="to"
          id="to"
          className={to !== "" ? "activeInputBorder" : ""}
        />

        <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setAdd(false);
              dispatch({ type: WORK_IMAGE, payload: null });
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            disabled={createWorkLoading}
            className={
              enTitle !== "" && arTitle !== "" && krTitle !== "" && company !== "" && work !== null && from !== ""
                ? "activePublish"
                : "publish"
            }
          >
            {createWorkLoading ? (
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

CreateWork.propTypes = {
  createWork: PropTypes.func.isRequired,
  work: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  work: state.work,
  image: state.image,
  admin: state.admin,
});

const mapDispatchToProps = { createWork };

export default connect(mapStateToProps, mapDispatchToProps)(CreateWork);
