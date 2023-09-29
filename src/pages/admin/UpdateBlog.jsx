import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addInnerBlogImage,
  deleteInnerBlogImage,
} from "../../context/actions/imageAction";
import { BLOG_IMAGE, INSIDE_BLOG_IMAGE } from "../../context/types/image_types";
import { useNavigate, useParams } from "react-router-dom";
import { getOneBlog, updateBlog } from "../../context/actions/blogAction";
import { BlogContext } from "../../context/BlogContext";
import { AlertContext } from "../../context/AlertContext";
import { ImageContext } from "../../context/ImageContext";
import FileInput from "../../components/inputs/FileInput";
import TextInput from "../../components/inputs/TextInput";
import CustomTextArea from "../../components/inputs/CustomTextArea";
import FakeInput from "../../components/inputs/FakeInput";
import { CategoryContext } from "../../context/CategoryContext";
import { getAllCategories } from "../../context/actions/categoryAction";
import SpinnerLoading from "../../components/global/SpinnerLoading";
export default function UpdateBlog() {
  const { blog_id } = useParams();
  const {
    dispatch: blogDispatch,
    state: { updateBlogLoading, blog, getOneBlogLoading },
  } = useContext(BlogContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: imageDispatch,
    state: {
      blogImage,
      insideBlogImage,
      deleteInnerBlogImageLoading,
      uploadInnerBlogImageLoading,
      uploadBlogImageLoading,
    },
  } = useContext(ImageContext);
  const {
    dispatch: categoryDispatch,
    state: { categories, getCategoriesLoading },
  } = useContext(CategoryContext);

  useEffect(() => {
    getOneBlog(blogDispatch, alertDispatch, blog_id);
  }, [blogDispatch]);

  useEffect(() => {
    getAllCategories(categoryDispatch, alertDispatch);
  }, [categoryDispatch]);

  const [inputs, setInputs] = useState({
    enTitle: blog?.enTitle,
    krTitle: blog?.krTitle,
    arTitle: blog?.arTitle,
    enBody: blog?.enBody,
    arBody: blog?.arBody,
    krBody: blog?.krBody,
  });
  const { enTitle, arTitle, krTitle, enBody, arBody, krBody } = inputs;
  const [activeCategories, setActiveCategories] = useState(
    blog?.categories.map((val) => val.category._id)
  );
  const mainImageRef = useRef("");
  const smallImageRef = useRef("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [deleteImageUrl, setDeleteImageUrl] = useState("");
  const [insideImages, setInsideImages] = useState([]);
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    if (blog) {
      setInputs({
        enTitle: blog?.enTitle,
        krTitle: blog?.krTitle,
        arTitle: blog?.arTitle,
        enBody: blog?.enBody,
        arBody: blog?.arBody,
        krBody: blog?.krBody,
      });
      setActiveCategories(
        blog?.categories.map((val) => ({
          category: val.category._id,
        }))
      );
    }
  }, [blog]);

  const onChange = useCallback(
    (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  useEffect(() => {
    const imgSrcs = extractImageSrcs(enBody);
    setInsideImages(imgSrcs);
  }, [enBody]);

  const extractImageSrcs = (htmlString) => {
    const imgSrcs = [];
    const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    let match;

    while ((match = imgTagRegex.exec(htmlString)) !== null) {
      imgSrcs.push(match[1]);
    }

    return imgSrcs;
  };
  return (
    <section
      data-aos="fade-up"
      className="w-full flex flex-col justify-left items-center gap-5 min-h-screen text-white overflow-hidden pl-[150px] pr-[50px] pb-[200px] bg-niceb"
    >
      {!getOneBlogLoading && (
        <form
          className="w-full h-fit flex flex-col justify-left items-center gap-[30px]"
          onSubmit={(e) => {
            e.preventDefault();
            updateBlog(
              blogDispatch,
              alertDispatch,
              imageDispatch,
              { ...inputs, categories: activeCategories },
              blog._id,
              setInputs,
              setActiveCategories,
              blogImage,
              blog.imageURL,
              blog.imageName,
              imageChanged,
              navigate
            );
          }}
        >
          <h1 className="font-bold w-full text-center">Add Blog</h1>
          {blog.imageURL && !imageChanged && (
            <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
              <img
                className="w-full h-[400px] object-cover rounded-md"
                src={blog.imageURL}
                alt="imageUpload"
              />
              <div className="absolute w-full top-0 right-0 left-0 z-50 bg-black opacity-80 h-[400px] rounded-md"></div>

              <button
                type="button"
                onClick={() => {
                  setImageChanged(true);
                }}
                className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
              >
                Remove Old Blog Image
              </button>
            </div>
          )}
          <div className="flex flex-col justify-left items-center gap-5 w-full">
            {!blogImage && imageChanged ? (
              <FileInput
                title={`Background Image`}
                value={""}
                onChange={(e) => {
                  imageDispatch({
                    type: BLOG_IMAGE,
                    payload: e.target.files[0],
                  });
                  setImageChanged(true);
                }}
                ref={mainImageRef}
                id={`blogImage`}
                className={`w-[300px] md:w-[600px]`}
              />
            ) : blogImage ? (
              <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
                <img
                  className="w-full h-[400px] object-cover rounded-md"
                  src={URL.createObjectURL(blogImage)}
                  alt="imageUpload"
                />
                <div className="absolute w-full top-0 right-0 left-0 z-50 bg-black opacity-80 h-[400px] rounded-md"></div>

                <button
                  onClick={() => {
                    imageDispatch({ type: BLOG_IMAGE, payload: "" });
                    mainImageRef.current = "";
                    setImageChanged(false);
                  }}
                  className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
                >
                  Remove Background Image
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col justify-left items-center gap-5 w-full">
            {!insideBlogImage ? (
              <FileInput
                title={`Inside Blog Image`}
                value={""}
                onChange={(e) => {
                  imageDispatch({
                    type: INSIDE_BLOG_IMAGE,
                    payload: e.target.files[0],
                  });
                }}
                ref={smallImageRef}
                id={`insideBlogImage`}
                className={`w-[300px] md:w-[600px]`}
              />
            ) : (
              <div className="relative w-full h-full flex flex-col justify-left items-center gap-5">
                <img
                  className="w-full h-[300px] object-cover rounded-md"
                  src={URL.createObjectURL(insideBlogImage)}
                  alt="imageUpload"
                />

                <div className="w-full flex flex-row justify-center items-center gap-5">
                  <button
                    disabled={uploadInnerBlogImageLoading}
                    onClick={() => {
                      addInnerBlogImage(
                        blogDispatch,
                        alertDispatch,
                        imageDispatch,
                        insideBlogImage
                      );
                    }}
                    className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
                  >
                    Upload Inside Blog Image
                  </button>
                  <button
                    disabled={uploadInnerBlogImageLoading}
                    onClick={() => {
                      imageDispatch({ type: INSIDE_BLOG_IMAGE, payload: "" });
                      mainImageRef.current = "";
                    }}
                    className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
                  >
                    Remove Inside Blog Image
                  </button>
                </div>
              </div>
            )}
          </div>
          <FakeInput
            title={`Inside Blog Image URL`}
            text={imageUrl}
            className={`w-[300px] md:w-[600px]`}
          />
          <span className="w-[300px] md:w-[600px] text-left  text-white !text-[20px]">
            Inside Blog Images Uploaded URL
          </span>
          {insideImages.map((val, index) => {
            return (
              <FakeInput
                key={index}
                title={`Inside Blog Image URL ${index + 1}`}
                text={val}
                className={`w-[300px] md:w-[600px]`}
              />
            );
          })}
          <TextInput
            value={deleteImageUrl}
            onChange={(e) => setDeleteImageUrl(e.target.value)}
            title={`Delete Image URL`}
            name={`deleteImageURL`}
            className={`w-[300px] md:w-[600px]`}
          />
          <button
            disabled={deleteInnerBlogImageLoading}
            onClick={() => {
              deleteInnerBlogImage(
                blogDispatch,
                alertDispatch,
                imageDispatch,
                deleteImageUrl,
                setDeleteImageUrl
              );
            }}
            className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4 disabled:bg-gray-500"
          >
            Delete Image
          </button>
          <div className="w-full flex flex-row justify-center items-center gap-[30px] flex-wrap">
            <TextInput
              value={enTitle}
              onChange={onChange}
              title={`English Title`}
              name={`enTitle`}
              className={`w-[300px] md:w-[600px]`}
            />
            <TextInput
              value={arTitle}
              onChange={onChange}
              title={`Arabic Title`}
              name={`arTitle`}
              className={`w-[300px] md:w-[600px]`}
            />
            <TextInput
              value={krTitle}
              onChange={onChange}
              title={`Kurdish Title`}
              name={`krTitle`}
              className={`w-[300px] md:w-[600px]`}
            />

            <CustomTextArea
              id={`enBody`}
              className={`w-[300px] md:w-[600px]`}
              title={`English Body`}
              onChange={onChange}
              name="enBody"
              value={enBody}
            />
            <CustomTextArea
              className={`w-[300px] md:w-[600px]`}
              title={`Arabic Body`}
              onChange={onChange}
              name="arBody"
              value={arBody}
            />
            <CustomTextArea
              className={`w-[300px] md:w-[600px]`}
              title={`Kurdish Body`}
              onChange={onChange}
              name="krBody"
              value={krBody}
            />
          </div>
          <span className="w-[300px] md:w-[600px] text-left  text-white !text-[20px]">
            Select Categories
          </span>
          <div className="flex flex-row justify-start items-center gap-5 flex-wrap md:w-[600px] w-[300px]">
            {categories?.map((category, index) => {
              return (
                <span
                  onClick={() => {
                    if (
                      activeCategories.find(
                        (val) => val.category === category._id
                      )
                    ) {
                      setActiveCategories((prev) => {
                        return prev.filter(
                          (val) => val.category !== category._id
                        );
                      });
                    } else {
                      setActiveCategories((prev) => [
                        ...prev,
                        { category: category._id },
                      ]);
                    }
                  }}
                  key={index}
                  className={`!text-[14px] p-2 rounded-md border-2 border-solid border-blue transition-all duration-300  hover:bg-blue hover:text-black cursor-pointer ${
                    activeCategories?.find(
                      (val) => val.category === category._id
                    )
                      ? "bg-blue text-black"
                      : "text-blue"
                  }`}
                >
                  {category.enName}
                </span>
              );
            })}
          </div>
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <button
              type="button"
              className="my-5 !text-[14px] text-purple border-2 border-solid border-purple rounded-md transition-all duration-300 hover:bg-purple hover:text-white p-2 px-4"
              onClick={() => {
                dispatch({ type: INSIDE_BLOG_IMAGE, payload: null });
                dispatch({ type: BLOG_IMAGE, payload: null });
                navigate(-1);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="my-5 !text-[14px] text-blue border-2 border-solid border-blue rounded-md transition-all duration-300 hover:bg-blue hover:text-white p-2 px-4 disabled:bg-gray-500"
              disabled={updateBlogLoading || uploadBlogImageLoading}
            >
              {updateBlogLoading || uploadBlogImageLoading ? (
                <SpinnerLoading size={`30px`} />
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
