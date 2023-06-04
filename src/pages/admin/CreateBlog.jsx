import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createBlog, uploadInnerBlogImage, deleteInnerBlogImage } from "../../actions/blog";
import { BLOG_IMAGE, INSIDE_BLOG_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/category";
const CreateBlog = React.memo(
  ({
    image: { blog, insideBlog },
    createBlog,
    blog: { blogs, createBlogLoading, uploadInnerImageLoading },
    admin: { user },
    uploadInnerBlogImage,
    deleteInnerBlogImage,
    getAllCategories,
    category: { categories, loading },
  }) => {
    useEffect(() => {
      getAllCategories({});
    }, []);
    const [{ enTitle, arTitle, krTitle, enBody, arBody, krBody }, setInputs] = useState({
      enTitle: "",
      krTitle: "",
      arTitle: "",
      enBody: "",
      arBody: "",
      krBody: "",
    });
    const [activeCategories, setActiveCategories] = useState([]);
    const dispatch = useDispatch();
    const mainImageRef = useRef();
    const smallImageRef = useRef();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [deleteImageUrl, setDeleteImageUrl] = useState("");

    const onChange = useCallback((e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);

    const onKeyDown = useCallback(
      (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          createBlog({
            enTitle,
            arTitle,
            krTitle,
            enBody,
            arBody,
            krBody,
            image: blog,
            userId: user._id,
            setInputs,
            activeCategories,
            setActiveCategories,
          });
        }
      },
      [enTitle, arTitle, krTitle, blog, user._id, createBlog, enBody, arBody, krBody]
    );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBlog({
            enTitle,
            arTitle,
            krTitle,
            enBody,
            arBody,
            krBody,
            image: blog,
            userId: user._id,
            setInputs,
            activeCategories,
            setActiveCategories,
          });
        }}
        className="createBlogPage  flex flex-column justify-center align-center w-100 gap-2"
      >
        <h1 className="headings">Create Blog</h1>

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
                ref={mainImageRef}
              />
              <label className="blogImageUploaderLabel flex justify-center align-center flex-column gap-2" htmlFor="blogImage">
                <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />

                <span className="imageUploadButton">Upload an Image</span>

                <p className="imageInfo">Image size 1215width 481Height</p>
              </label>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(blog)} alt="imageUpload" />
              <div className="overImage"></div>

              <span
                onClick={() => {
                  dispatch({ type: BLOG_IMAGE, payload: null });
                  mainImageRef.current = "";
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
            {!insideBlog ? (
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
                <img className="URLImage" src={URL.createObjectURL(insideBlog)} alt="imageUpload" />
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
                  onClick={() => uploadInnerBlogImage(insideBlog, smallImageRef, setImageUrl)}
                  className="uploadInnerImage"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
          <p className="imageUrlAddress">{imageUrl}</p>
          <input className="deleteImageInput" value={deleteImageUrl} onChange={(e) => setDeleteImageUrl(e.target.value)} type="text" />
          <button
            type="button"
            disabled={uploadInnerImageLoading}
            onClick={() => deleteInnerBlogImage(deleteImageUrl, setDeleteImageUrl)}
            className="deleteImageButton"
          >
            Delete Image
          </button>
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

          <h3 className="w-100 text-left">Categories</h3>

          <div className="flex flex-row w-100 justify-left align-center gap-2">
            {categories?.map((category, index) => {
              return (
                <span
                  onClick={() => {
                    if (activeCategories.includes(category._id)) {
                      setActiveCategories((prev) => {
                        return prev.filter((val) => val !== category._id);
                      });
                    } else {
                      setActiveCategories((prev) => [...prev, category._id]);
                    }
                  }}
                  key={index}
                  className={`category ${activeCategories.includes(category._id) && "activeCategory"}`}
                >
                  {category.enName}
                </span>
              );
            })}
          </div>

          <div className="publishAndCancel flex flex-row justify-left align-center gap-2">
            <span
              className="cancelLink"
              onClick={() => {
                dispatch({ type: INSIDE_BLOG_IMAGE, payload: null });
                dispatch({ type: BLOG_IMAGE, payload: null });
                navigate(-1);
              }}
            >
              Cancel
            </span>

            <button
              type="submit"
              disabled={createBlogLoading}
              className={
                enTitle !== "" && arTitle !== "" && krTitle !== "" && enBody !== "" && arBody !== "" && krBody !== "" && blog
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
  }
);

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  uploadInnerBlogImage: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  deleteInnerBlogImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  image: state.image,
  admin: state.admin,
  category: state.category,
});

const mapDispatchToProps = { createBlog, uploadInnerBlogImage, getAllCategories, deleteInnerBlogImage };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
