import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../actions/blog";
import { Spinner } from "@chakra-ui/react";
import { BLOG_UPDATE_IMAGE } from "../../actions/types";
import { UPLOAD_BLOG_IMAGE } from "../../actions/url";
const UpdateBlog = ({
  enTitle,
  arTitle,
  krTitle,
  enBody,
  krBody,
  arBody,
  id,
  oldImage,
  updateBlog,
  image,
  setUpdate,
  blog: { updateBlogLoading },
}) => {
  const [imageChanged, setImageChanged] = useState(false);
  const [inputs, setInputs] = useState({
    enTitle: enTitle,
    krTitle: krTitle,
    arTitle: arTitle,
    enBody: enBody,
    arBody: arBody,
    krBody: krBody,
  });
  const dispatch = useDispatch();
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      updateBlog({
        enTitle: inputs.enTitle,
        krTitle: inputs.krTitle,
        arTitle: inputs.arTitle,
        enBody: inputs.enBody,
        arBody: inputs.arBody,
        krBody: inputs.krBody,
        image: image.updateBlog,
        blogId: id,
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
        updateBlog({
          enTitle: inputs.enTitle,
          krTitle: inputs.krTitle,
          arTitle: inputs.arTitle,
          enBody: inputs.enBody,
          arBody: inputs.arBody,
          krBody: inputs.krBody,
          image: image.updateBlog,
          blogId: id,
          setUpdate,
          oldImage,
          setInputs,
          imageChanged,
        });
      }}
      className="createBlog position-fixed flex flex-column justify-center align-center w-100 gap-2 update"
    >
      <h1>Update Blog</h1>
      <div className="inner">
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
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {image.updateBlog ? (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(image.updateBlog)} alt="imageUpload" />
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
                    type: BLOG_UPDATE_IMAGE,
                    payload: e.target.files[0],
                  });
                  setImageChanged(true);
                }}
                type="file"
                name="blog"
                id="updateBlog"
                className="blogImage"
              />

              <img className="URLImage" src={`${oldImage}`} alt="imageUpload" />

              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="updateBlog">
                <div className="editButton flex flex-row align-center  justify-center">
                  <img src="/images/edit.svg" alt="editImage" className="editImage" />
                  <span>Edit</span>
                </div>
              </label>
            </>
          )}
        </div>
        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.enBody}
          placeholder="write an english article"
          name="enBody"
          id="enBody"
          className={inputs.enBody !== "" ? "activeInputBorder" : null}
        />
        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.arBody}
          placeholder="write an arabic article"
          name="arBody"
          id="arBody"
          className={inputs.arBody !== "" ? "activeInputBorder" : null}
        />
        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.krBody}
          placeholder="write an kurdish article"
          name="krBody"
          id="krBody"
          className={inputs.krBody !== "" ? "activeInputBorder" : null}
        />

        <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
          <button
            onClick={() => {
              setUpdate(false);
              dispatch({ type: BLOG_UPDATE_IMAGE, payload: null });
            }}
            className="cancelLink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateBlogLoading}
            className={
              inputs.enTitle !== "" &&
              inputs.arTitle !== "" &&
              inputs.krTitle !== "" &&
              inputs.enBody !== "" &&
              inputs.arBody !== "" &&
              inputs.krBody !== ""
                ? "activePublish"
                : "publish"
            }
          >
            {updateBlogLoading ? (
              <div className="w-100">
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
UpdateBlog.propTypes = {
  admin: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  blog: state.blog,
  image: state.image,
});

const mapDispatchToProps = { updateBlog };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);
