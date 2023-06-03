import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { updateWork } from "../../actions/work";
import { Spinner } from "@chakra-ui/react";
import { WORK_UPDATE_IMAGE } from "../../actions/types";
const UpdateWork = ({
  enTitle,
  arTitle,
  krTitle,
  company,
  from,
  to,
  id,
  oldImage,
  updateWork,
  image,
  setUpdate,
  work: { updateWorkLoading },
}) => {
  const [imageChanged, setImageChanged] = useState(false);
  const [inputs, setInputs] = useState({
    enTitle: enTitle,
    krTitle: krTitle,
    arTitle: arTitle,
    company: company,
    from: from,
    to: to,
  });
  const dispatch = useDispatch();
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      updateWork({
        enTitle: inputs.enTitle,
        krTitle: inputs.krTitle,
        arTitle: inputs.arTitle,
        company: inputs.company,
        from: inputs.from,
        to: inputs.to,
        image: image.updateWork,
        workId: id,
        setUpdate,
        oldImage,
        setInputs,
        imageChanged,
      });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateWork({
          enTitle: inputs.enTitle,
          krTitle: inputs.krTitle,
          arTitle: inputs.arTitle,
          company: inputs.company,
          from: inputs.from,
          to: inputs.to,
          image: image.updateWork,
          workId: id,
          setUpdate,
          oldImage,
          setInputs,
          imageChanged,
        });
      }}
      className="createWork position-fixed flex flex-column justify-center align-center w-100 gap-2 update"
    >
      <h1>Update Work</h1>
      <div className="inner">
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {image.updateWork ? (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(image.updateWork)} alt="imageUpload" />
              <span
                onClick={() => {
                  dispatch({ type: WORK_UPDATE_IMAGE, payload: null });
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
                    type: WORK_UPDATE_IMAGE,
                    payload: e.target.files[0],
                  });
                  setImageChanged(true);
                }}
                type="file"
                name="work"
                id="updateWork"
                className="workImage"
              />

              <img className="URLImage" src={`${oldImage}`} alt="imageUpload" />

              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="updateWork">
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
        />
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
          value={inputs.company}
          placeholder="Enter the Company"
          type="text"
          name="company"
          id="company"
          className={inputs.company !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.from}
          placeholder="Enter Start Date"
          type="date"
          name="from"
          id="from"
          className={inputs.from !== "" ? "activeInputBorder" : ""}
        />

        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.to}
          placeholder="Enter End Date"
          type="date"
          name="to"
          id="to"
          className={inputs.to !== "" ? "activeInputBorder" : ""}
        />
        <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
          <button
            onClick={() => {
              setUpdate(false);
              dispatch({ type: WORK_UPDATE_IMAGE, payload: null });
            }}
            className="cancelLink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateWorkLoading}
            className={
              inputs.enTitle !== "" &&
              inputs.arTitle !== "" &&
              inputs.krTitle !== "" &&
              inputs.company !== "" &&
              inputs.from !== "" &&
              inputs.to !== ""
                ? "activePublish"
                : "publish"
            }
          >
            {updateWorkLoading ? (
              <div className="w-100 loadingSpinner">
                <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
UpdateWork.propTypes = {
  admin: PropTypes.object.isRequired,
  work: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  work: state.work,
  image: state.image,
});

const mapDispatchToProps = { updateWork };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWork);
