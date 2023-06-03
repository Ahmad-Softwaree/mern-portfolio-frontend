import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { updateBlog, getOneBlog, uploadInnerBlogImage } from "../../actions/blog";
import { BLOG_IMAGE, BLOG_UPDATE_IMAGE, INSIDE_BLOG_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateBlog = React.memo(
  ({
    image,
    getOneBlog,
    updateBlog,
    blog: { blog, blogs, updateBlogLoading, uploadInnerImageLoading },
    admin: { user },
    uploadInnerBlogImage,
  }) => {
    const { blog_id } = useParams();
    const [update, setUpdate] = useState(false);
    useEffect(() => {
      getOneBlog({ blogId: blog_id });
    }, [blog_id, update]);

    const [{ enTitle, arTitle, krTitle, enBody, arBody, krBody }, setInputs] = useState({
      enTitle: blog.enTitle || "",
      krTitle: blog.krTitle || "",
      arTitle: blog.arTitle || "",
      enBody: blog.enBody || "",
      arBody: blog.arBody || "",
      krBody: blog.krBody || "",
    });

    useEffect(() => {
      setInputs({
        enTitle: blog.enTitle || "",
        krTitle: blog.krTitle || "",
        arTitle: blog.arTitle || "",
        enBody: blog.enBody || "",
        arBody: blog.arBody || "",
        krBody: blog.krBody || "",
      });
    }, [blog]);
    const dispatch = useDispatch();
    const mainImageRef = useRef();
    const smallImageRef = useRef();
    const [imageChanged, setImageChanged] = useState(false);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    const onChange = useCallback((e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);

    const onKeyDown = useCallback(
      (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          updateBlog({
            enTitle,
            arTitle,
            krTitle,
            enBody,
            arBody,
            krBody,
            image: blog,
            userId: user._id,
            setInputs,
            imageChanged,
            oldImage: blog.image,
            blogId: blog_id,
            image: image.updateBlog,
            setUpdate,
          });
        }
      },
      [enTitle, arTitle, krTitle, blog, user._id, updateBlog, arBody, enBody, krBody]
    );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBlog({
            enTitle,
            arTitle,
            krTitle,
            enBody,
            arBody,
            krBody,
            image: blog,
            userId: user._id,
            setInputs,
            imageChanged,
            oldImage: blog.image,
            blogId: blog_id,
            image: image.updateBlog,
            setUpdate,
          });
        }}
        className="createBlogPage updateBlogPage  flex flex-column justify-center align-center w-100 gap-2"
      >
        <h1 className="headings">Create Blog</h1>

        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!image.updateBlog ? (
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
                name="update_blog"
                id="update_blog"
                className="blogImage"
                ref={mainImageRef}
              />
              <label
                className="blogImageUploaderLabel mainLabel flex justify-center align-center flex-column gap-2 position-relative"
                htmlFor="update_blog"
              >
                <div className="overImage"></div>
                <img className="blogUnderBlack" src={blog.image} alt="blog Image" />
                <div className="blogHeader flex flex-column w-100 justify-center align-center gap-2">
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

                  <div className=" blogOwner flex flex-column justify-left align-center ">
                    <img src={`${user.image}`} alt="Blog Image" />
                    <span>Ahmad Software</span>
                    <p>Founder & CEO of Bester Group Company</p>
                  </div>
                </div>
              </label>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(image.updateBlog)} alt="imageUpload" />
              <div className="overImage"></div>

              <span
                onClick={() => {
                  dispatch({ type: BLOG_UPDATE_IMAGE, payload: null });
                  mainImageRef.current = "";
                  setImageChanged(false);
                }}
                className="position-absolute x"
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
              <div className="blogHeader flex flex-column w-100 justify-center align-center gap-2">
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

                <div className=" blogOwner flex flex-column justify-left align-center ">
                  <img src={`${user.image}`} alt="Blog Owner Image" />
                  <span>Ahmad Software</span>
                  <p>Founder & CEO of Bester Group Company</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="inner">
          <div className="fileInputDiv smallInputDiv flex flex-column justify-center align-center gap-1">
            {!image.insideBlog ? (
              <>
                <input
                  onChange={(e) =>
                    dispatch({
                      type: INSIDE_BLOG_IMAGE,
                      payload: e.target.files[0],
                    })
                  }
                  type="file"
                  name="innerBlog"
                  id="innerBlog"
                  className="blogImage"
                  ref={smallImageRef}
                />
                <label className="blogImageUploaderLabel flex justify-center align-center flex-column gap-2" htmlFor="innerBlog">
                  <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />

                  <span className="imageUploadButton">Upload an Image</span>

                  <p className="imageInfo">The Url will be down here</p>
                </label>
              </>
            ) : (
              <div className="URLImage position-relative">
                <img className="URLImage" src={URL.createObjectURL(image.insideBlog)} alt="imageUpload" />
                <span
                  onClick={() => {
                    dispatch({ type: INSIDE_BLOG_IMAGE, payload: null });
                    smallImageRef.current = "";
                  }}
                  className="position-absolute x"
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
                <button
                  type="button"
                  disabled={uploadInnerImageLoading}
                  onClick={() => uploadInnerBlogImage(image.insideBlog, smallImageRef, setImageUrl)}
                  className="uploadInnerImage"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
          <p className="imageUrlAddress">{imageUrl}</p>
          <textarea
            onKeyDown={(e) => {
              if (e.keyCode === 9) {
                e.preventDefault();
              }
            }}
            onChange={onChange}
            value={enBody}
            name="enBody"
            id="enBody"
          />
          <textarea
            onKeyDown={(e) => {
              if (e.keyCode === 9) {
                e.preventDefault();
              }
            }}
            onChange={onChange}
            value={arBody}
            name="arBody"
            id="arBody"
          />
          <textarea
            onKeyDown={(e) => {
              if (e.keyCode === 9) {
                e.preventDefault();
              }
            }}
            onChange={onChange}
            value={krBody}
            name="krBody"
            id="krBody"
          />

          <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
            <span
              className="cancelLink"
              onClick={() => {
                dispatch({ type: INSIDE_BLOG_IMAGE, payload: null });
                dispatch({ type: BLOG_UPDATE_IMAGE, payload: null });
                navigate(-1);
              }}
            >
              Cancel
            </span>

            <button
              type="submit"
              disabled={updateBlogLoading}
              className={
                enTitle !== "" && arTitle !== "" && krTitle !== "" && enBody !== "" && arBody !== "" && krBody !== ""
                  ? "activePublish"
                  : "publish"
              }
            >
              {updateBlogLoading ? (
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
  }
);

UpdateBlog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  uploadInnerBlogImage: PropTypes.func.isRequired,
  getOneBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  image: state.image,
  admin: state.admin,
});

const mapDispatchToProps = { updateBlog, getOneBlog, uploadInnerBlogImage };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);
