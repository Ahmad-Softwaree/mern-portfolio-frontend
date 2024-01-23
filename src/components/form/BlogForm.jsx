import { ImageContext } from "@/context/ImageContext";
import { UiContext } from "@/context/UiContext";
import useDynamicState from "@/hooks/useDynamicState";
import { Textarea } from "@chakra-ui/react";

import { useCallback, useContext, useEffect, useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import { Loader } from "../shared";
import { ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTEXT_TYPEs } from "@/context";
import { useAddBlog, useUpdateBlog } from "@/lib/react-query/query/blog.query";

import { useGetConfig } from "@/lib/react-query/query/config.query";
import { QUERY_KEYs } from "@/lib/react-query/types";
import { ENUMs } from "@/lib/enum";
import { LanguageContext } from "@/context/LanguageContext";
const BlogForm = () => {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  const { data: categories, isLoading } = useGetConfig(
    QUERY_KEYs.CATEGORIES,
    ENUMs.CATEGORY
  );
  const {
    dispatch,
    state: { type: form_type, id, data },
  } = useContext(UiContext);
  const {
    dispatch: imageDispatch,
    state: { blogImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    enTitle: "",
    arTitle: "",
    krTitle: "",
    enBody: "",
    arBody: "",
    krBody: "",
    categories: [],
  });
  const { enTitle, arTitle, krTitle, enBody, arBody, krBody } = state;
  const onChange = useCallback((e) => {
    updateState(e.target.name, e.target.value);
  });
  const { mutateAsync, isPending } =
    form_type === "add" ? useAddBlog() : useUpdateBlog(data?._id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.BLOG_IMAGE,
      payload: "",
    });
    if (form_type === "update" && data) {
      replaceState({
        enTitle: data?.enTitle,
        arTitle: data?.arTitle,
        krTitle: data?.krTitle,
        enBody: data?.enBody,
        arBody: data?.arBody,
        krBody: data?.krBody,
        categories: data?.categories.map((val) => val._id),
      });
    }
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutateAsync({
          state,
          oldImg: data?.imageName,
          oldURL: data?.imageURL,
          image: blogImage,
        });
      }}
      className="max-h-[600px] overflow-y-auto fixed inset-0 w-[90%] max-w-[1000px] p-5 rounded-md bg-black-600 text-white-500 z-[1500] m-auto h-fit flex flex-col justify-left items-center gap-5">
      <h1 className="text-body2-semibold md:text-body1-semibold">
        {form_type === "add" ? "Add" : "Update"} Blog
      </h1>
      <FormControl isRequired>
        <FormLabel>English Title</FormLabel>
        <Input name="enTitle" type="text" value={enTitle} onChange={onChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Arabic Title</FormLabel>
        <Input name="arTitle" type="text" value={arTitle} onChange={onChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Kurdish Title</FormLabel>
        <Input name="krTitle" type="text" value={krTitle} onChange={onChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mb={`8px`}>English Body</FormLabel>
        <Textarea
          size={`lg`}
          name="enBody"
          type="text"
          value={enBody}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mb={`8px`}>Arabic Body</FormLabel>
        <Textarea
          size={`lg`}
          name="arBody"
          type="text"
          value={arBody}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mb={`8px`}>Kurdish Body</FormLabel>
        <Textarea
          size={`lg`}
          name="krBody"
          type="text"
          value={krBody}
          onChange={onChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Categories</FormLabel>
        <div className="w-full flex-row justify-start gap-5 flex flex-wrap">
          {categories?.map((val, index) => {
            return (
              <button
                type="button"
                onClick={(e) => {
                  if (state.categories.includes(val._id)) {
                    updateState(
                      "categories",
                      state.categories.filter((one) => one !== val._id)
                    );
                  } else {
                    console.log("else");
                    updateState("categories", [...state.categories, val._id]);
                  }
                }}
                className={`p-2 rounded-lg cursor-pointer  px-3 border-2 border-solid border-primary-500 hover:bg-primary-500 hover:text-white ${
                  state.categories?.includes(val._id) && "bg-primary-500"
                }`}
                key={index}
                value={val._id}>
                {lang === "en"
                  ? val.enName
                  : lang === "ar"
                  ? val.arName
                  : val.krName}
              </button>
            );
          })}
        </div>
      </FormControl>
      <div className="grid w-full items-center gap-1.5 bg-black-600">
        <Label htmlFor="picture">Picture</Label>
        <ShadInput
          onChange={(e) => {
            imageDispatch({
              type: CONTEXT_TYPEs.BLOG_IMAGE,
              payload: e.target.files[0],
            });
          }}
          className="!bg-black-600 !cursor-pointer"
          id="picture"
          type="file"
        />
      </div>
      {blogImage !== "" && blogImage && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={URL.createObjectURL(blogImage)}
            alt="blogImage"
          />
        </div>
      )}
      {!blogImage && blogImage === "" && data?.imageURL && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={data?.imageURL}
            alt="blogImage"
          />
        </div>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-10">
        <Button mt={4} colorScheme="teal" isLoading={isPending} type="submit">
          {isPending ? <Loader /> : "Submit"}
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: CONTEXT_TYPEs.BLOG_FORM,
            })
          }
          mt={4}
          colorScheme="red"
          type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
