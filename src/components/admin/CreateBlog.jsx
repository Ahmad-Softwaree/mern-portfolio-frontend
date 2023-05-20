import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createBlog } from "../../actions/blog";
import { BLOG_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";

const CreateBlog = React.memo(({ image: { blog }, createBlog, blog: { blogs, createBlogLoading }, setAdd, admin: { user } }) => {
  const [{ enTitle, arTitle, krTitle, enBody, arBody, krBody }, setInputs] = useState({
    enTitle: "",
    krTitle: "",
    arTitle: "",
    enBody: "",
    arBody: "",
    krBody: "",
  });
  const dispatch = useDispatch();

  const onChange = useCallback((e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "13" && !e.shiftKey) {
        createBlog({ enTitle, arTitle, krTitle, enBody, arBody, krBody, image: blog, userId: user._id, setInputs });
      }
    },
    [enTitle, arTitle, krTitle, enBody, arBody, krBody, blog, user._id, createBlog]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBlog({ enTitle, arTitle, krTitle, enBody, arBody, krBody, image: blog, userId: user._id, setInputs });
      }}
      className="createBlog position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Create Blog</h1>

      <div className="inner">
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
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!blog ? (
            <>
              <input
                onChange={(e) =>
                  dispatch({
                    type: BLOG_IMAGE,
                    payload: e.target.files[0],
                  })
                }
                type="file"
                name="blog"
                id="blogImage"
                className="blogImage"
              />

              <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />
              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="blogImage">
                <span className="imageUploadButton">Upload an Image</span>
              </label>
              <p className="imageInfo">Image size 1215width 481Height</p>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(blog)} alt="imageUpload" />
              <span onClick={() => dispatch({ type: BLOG_IMAGE, payload: null })} className="position-absolute x">
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          )}
        </div>

        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={enBody}
          placeholder="write an english article"
          name="enBody"
          id="enBody"
          className={enBody !== "" ? "activeInputBorder" : null}
        />

        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={arBody}
          placeholder="write an arabic article"
          name="arBody"
          id="arBody"
          className={arBody !== "" ? "activeInputBorder" : null}
        />
        <textarea
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={krBody}
          placeholder="write an kurdish article"
          name="krBody"
          id="krBody"
          className={krBody !== "" ? "activeInputBorder" : null}
        />

        <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setAdd(false);
              dispatch({ type: BLOG_IMAGE, payload: null });
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            disabled={createBlogLoading}
            className={
              enTitle !== "" && arTitle !== "" && krTitle !== "" && enBody !== "" && arBody !== "" && krBody !== ""
                ? "activePublish"
                : "publish"
            }
          >
            {createBlogLoading ? (
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
});

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  image: state.image,
  admin: state.admin,
});

const mapDispatchToProps = { createBlog };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
