import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  updateBlog,
  getOneBlog,
  uploadInnerBlogImage,
  deleteInnerBlogImage,
} from "../../actions/blog";
import { BLOG_UPDATE_IMAGE, INSIDE_BLOG_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../actions/category";
const UpdateBlog = React.memo(
  ({
    image,
    getOneBlog,
    updateBlog,
    blog: { blog, blogs, updateBlogLoading, uploadInnerImageLoading },
    admin: { user },
    uploadInnerBlogImage,
    getAllCategories,
    deleteInnerBlogImage,
    category: { categories, loading },
  }) => {
    const { blog_id } = useParams();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      getOneBlog({ blogId: blog_id });
      getAllCategories({});
    }, [blog_id, update]);

    const [{ enTitle, arTitle, krTitle, enBody, arBody, krBody }, setInputs] =
      useState({
        enTitle: blog.enTitle || "",
        krTitle: blog.krTitle || "",
        arTitle: blog.arTitle || "",
        enBody: blog.enBody || "",
        arBody: blog.arBody || "",
        krBody: blog.krBody || "",
      });
    const [activeCategories, setActiveCategories] = useState([]);
    const [deleteImageUrl, setDeleteImageUrl] = useState("");

    useEffect(() => {
      setInputs({
        enTitle: blog.enTitle || "",
        krTitle: blog.krTitle || "",
        arTitle: blog.arTitle || "",
        enBody: blog.enBody || "",
        arBody: blog.arBody || "",
        krBody: blog.krBody || "",
      });

      setActiveCategories(
        blog.categories?.map((val) => {
          return val._id;
        })
      );
    }, [blog]);
    const dispatch = useDispatch();
    const mainImageRef = useRef();
    const smallImageRef = useRef();
    const [imageChanged, setImageChanged] = useState(false);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    const onChange = useCallback(
      (e) =>
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })),
      []
    );

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
            userId: user._id,
            setInputs,
            imageChanged,
            oldImage: blog.image,
            blogId: blog_id,
            image: image.updateBlog,
            setUpdate,
            activeCategories,
          });
        }
      },
      [
        enTitle,
        arTitle,
        krTitle,
        blog,
        user._id,
        updateBlog,
        arBody,
        enBody,
        krBody,
      ]
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
            userId: user._id,
            setInputs,
            imageChanged,
            oldImage: blog.image,
            blogId: blog_id,
            image: image.updateBlog,
            setUpdate,
            activeCategories,
          });
        }}
        className="createBlogPage updateBlogPage  flex flex-col justify-center align-center w-full gap-2"
      >
        <h1 className="headings">Add Blog</h1>

        <div className="fileInputDiv flex flex-col justify-center align-center gap-1">
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
                className="blogImageUploaderLabel mainLabel flex justify-center align-center flex-col gap-2 position-relative"
                htmlFor="update_blog"
              >
                <div className="overImage"></div>
                <img
                  className="blogUnderBlack"
                  src={blog.image}
                  alt="blog Image"
                />
                <div className="blogHeader flex flex-col w-full justify-center align-center gap-2">
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

                  <div className=" blogOwner flex flex-col justify-left align-center ">
                    <img src={`${user.image}`} alt="Blog Image" />
                    <span>Ahmad Software</span>
                    <p>Founder & CEO of Bester Group Company</p>
                  </div>
                </div>
              </label>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img
                className="URLImage"
                src={URL.createObjectURL(image.updateBlog)}
                alt="imageUpload"
              />
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
              <div className="blogHeader flex flex-col w-full justify-center align-center gap-2">
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

                <div className=" blogOwner flex flex-col justify-left align-center ">
                  <img src={`${user.image}`} alt="Blog Owner Image" />
                  <span>Ahmad Software</span>
                  <p>Founder & CEO of Bester Group Company</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="inner">
          <div className="fileInputDiv smallInputDiv flex flex-col justify-center align-center gap-1">
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
                <label
                  className="blogImageUploaderLabel flex justify-center align-center flex-col gap-2"
                  htmlFor="innerBlog"
                >
                  <img
                    className="imageUploadCloud"
                    src="/images/uploadImage.svg"
                    alt="imageUpload"
                  />

                  <span className="imageUploadButton">Upload an Image</span>

                  <p className="imageInfo">The Url will be down here</p>
                </label>
              </>
            ) : (
              <div className="URLImage position-relative">
                <img
                  className="URLImage"
                  src={URL.createObjectURL(image.insideBlog)}
                  alt="imageUpload"
                />
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
                  onClick={() =>
                    uploadInnerBlogImage(
                      image.insideBlog,
                      smallImageRef,
                      setImageUrl
                    )
                  }
                  className="uploadInnerImage"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
          <p className="imageUrlAddress">{imageUrl}</p>
          <input
            className="deleteImageInput"
            value={deleteImageUrl}
            onChange={(e) => setDeleteImageUrl(e.target.value)}
            type="text"
          />
          <button
            type="button"
            disabled={uploadInnerImageLoading}
            onClick={() =>
              deleteInnerBlogImage(deleteImageUrl, setDeleteImageUrl)
            }
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

          <h3 className="w-full text-left">Categories</h3>

          <div className="flex flex-row w-full justify-left align-center gap-2">
            {categories?.map((category, index) => {
              return (
                <span
                  onClick={() => {
                    if (activeCategories?.includes(category._id)) {
                      setActiveCategories((prev) => {
                        return prev.filter((val) => val !== category._id);
                      });
                    } else {
                      setActiveCategories((prev) => [...prev, category._id]);
                    }
                  }}
                  key={index}
                  className={`category ${
                    activeCategories?.includes(category._id) && "activeCategory"
                  }`}
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
                enTitle !== "" &&
                arTitle !== "" &&
                krTitle !== "" &&
                enBody !== "" &&
                arBody !== "" &&
                krBody !== ""
                  ? "activePublish"
                  : "publish"
              }
            >
              {updateBlogLoading ? (
                <div className="w-full loadingSpinner">
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
