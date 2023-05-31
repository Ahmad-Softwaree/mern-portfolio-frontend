import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createBlog } from "../../actions/blog";
import { BLOG_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
const CreateBlog = React.memo(({ image: { blog }, createBlog, blog: { blogs, createBlogLoading }, setAdd, admin: { user } }) => {
  const [{ enTitle, arTitle, krTitle }, setInputs] = useState({
    enTitle: "",
    krTitle: "",
    arTitle: "",
  });
  const [textareas, setTextareas] = useState([]);
  const dispatch = useDispatch();
  const blogBodyRef = useRef();
  const onChange = useCallback((e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);

  const onTextareaChange = (e, id) => {
    const data = textareas.map((textarea) => {
      if (textarea.id === id) {
        return {
          ...textarea,
          value: e.target.value,
        };
      }
      return textarea;
    });
    setTextareas(data);
  };

  const uuid = () => {
    return crypto.randomUUID();
  };
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "13" && !e.shiftKey) {
        createBlog({ enTitle, arTitle, krTitle, image: blog, userId: user._id, setInputs });
      }
    },
    [enTitle, arTitle, krTitle, blog, user._id, createBlog]
  );

  const onAdd = (e, type) => {
    if (type === "textarea") {
      let id = uuid();
      const newTextarea = {
        id,
        value: "",
        name: id,
      };
      setTextareas((prevTextareas) => [...prevTextareas, newTextarea]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBlog({ enTitle, arTitle, krTitle, image: blog, userId: user._id, setInputs });
      }}
      className="createBlogPage  flex flex-column justify-center align-center w-100 gap-2"
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

        <div className="styles flex flex-column justify-left align-start w-100 gap-1 flex-wrap">
          <div className=" flex flex-row justify-left align-center w-100 gap-2 flex-wrap">
            <span>Insert: </span>
            <span onClick={(e) => onAdd(e, "textarea")}>
              <i className="fa-solid fa-t"></i>
            </span>
            <span onClick={(e) => onAdd(e, "textarea")}>
              <i className="fa-solid fa-heading"></i>
            </span>
          </div>

          <div className=" flex flex-row justify-left align-center w-100 gap-2 flex-wrap">
            <span>Style: </span>
            <span>
              <i className="fa-solid fa-font"></i>
            </span>
            <span>
              <i className="fa-solid fa-italic"></i>
            </span>
            <span>
              <i className="fa-solid fa-bold"></i>
            </span>
            <span>
              <i className="fa-solid fa-list-ol"></i>
            </span>
            <span>
              <i className="fa-solid fa-list-ul"></i>
            </span>
            <span>
              <i className="fa-solid fa-image"></i>
            </span>
          </div>

          <div className=" flex flex-row justify-left align-center w-100 gap-2 flex-wrap">
            <span>Text: </span>
            <span>
              <i className="fa-solid fa-quote-left"></i>
            </span>
            <span>
              <i className="fa-solid fa-underline"></i>
            </span>
            <span>
              <i className="fa-solid fa-align-justify"></i>
            </span>
            <span>
              <i className="fa-solid fa-align-left"></i>
            </span>
            <span>
              <i className="fa-solid fa-align-right"></i>
            </span>
            <span>
              <i className="fa-solid fa-highlighter"></i>
            </span>
          </div>
        </div>

        {/* <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
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
 */}

        <div ref={blogBodyRef} className="blogBodyDiv">
          {textareas.map((textarea) => (
            <textarea
              key={textarea.id}
              value={textarea.value}
              name={textarea.id}
              id={textarea.id}
              onChange={(e) => onTextareaChange(e, textarea.id)}
            ></textarea>
          ))}
        </div>

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
            className={enTitle !== "" && arTitle !== "" && krTitle !== "" ? "activePublish" : "publish"}
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
