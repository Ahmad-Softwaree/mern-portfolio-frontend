import { ImageContext } from "@/context/ImageContext";
import { UiContext } from "@/context/UiContext";
import useDynamicState from "@/hooks/useDynamicState";
import { Textarea } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Loader } from "../shared";
import { ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTEXT_TYPEs } from "@/context";
import { useAddWork, useUpdateWork } from "@/lib/react-query/query/work.query";
import { useGetConfig } from "@/lib/react-query/query/config.query";
import { QUERY_KEYs } from "@/lib/react-query/types";
import { ENUMs } from "@/lib/enum";
import { LanguageContext } from "@/context/LanguageContext";
const WorkForm = () => {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  const { data: types } = useGetConfig(QUERY_KEYs.TYPES, ENUMs.TYPE);
  const { data: stacks } = useGetConfig(QUERY_KEYs.STACKS, ENUMs.STACK);
  console.log(stacks);
  const {
    dispatch,
    state: { type: form_type, id, data },
  } = useContext(UiContext);
  const {
    dispatch: imageDispatch,
    state: { workImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    company: "",
    enTitle: "",
    arTitle: "",
    krTitle: "",
    url: "",
    company: "",
    from: "",
    to: "",
    continue: false,
  });

  const { enTitle, arTitle, krTitle, url, company, form, to } = state;
  const onChange = useCallback((e) => {
    updateState(e.target.name, e.target.value);
  });

  const { mutateAsync, isPending } =
    form_type === "add" ? useAddWork() : useUpdateWork(data?._id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.WORK_IMAGE,
      payload: "",
    });
    if (form_type === "update" && data) {
      replaceState({
        company: data?.company,
        enTitle: data?.enTitle,
        arTitle: data?.arTitle,
        krTitle: data?.krTitle,
        url: data?.url,
        company: data?.company,
        from: data?.from,
        to: data?.to,
        continue: data?.continue,
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
          image: workImage,
        });
      }}
      className="max-h-[600px] overflow-y-auto fixed inset-0 w-[90%] max-w-[1000px] p-5 rounded-md bg-black-600 text-white-500 z-[1500] m-auto h-fit flex flex-col justify-left items-center gap-5">
      <h1 className="text-body2-semibold md:text-body1-semibold">
        {form_type === "add" ? "Add" : "Update"} Work
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
        <FormLabel>Company</FormLabel>
        <Input name="company" type="text" value={company} onChange={onChange} />
      </FormControl>

      <div className="grid !max-w-none !w-full  items-center gap-1.5 bg-black-600">
        <Label htmlFor="picture">Picture</Label>
        <ShadInput
          onChange={(e) => {
            imageDispatch({
              type: CONTEXT_TYPEs.WORK_IMAGE,
              payload: e.target.files[0],
            });
          }}
          className="!bg-black-600 !w-full !cursor-pointer"
          id="picture"
          type="file"
        />
      </div>
      {workImage !== "" && workImage && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={URL.createObjectURL(workImage)}
            alt="workImage"
          />
        </div>
      )}
      {!workImage && workImage === "" && data?.imageURL && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={data?.imageURL}
            alt="workImage"
          />
        </div>
      )}

      <FormControl isRequired>
        <FormLabel>Link</FormLabel>

        <Input
          value={url}
          onChange={onChange}
          name={`url`}
          placeholder="mysite"
        />
      </FormControl>
      <div className="w-full flex flex-row justify-center items-center gap-10">
        <Button mt={4} colorScheme="teal" isLoading={isPending} type="submit">
          {isPending ? <Loader /> : "Submit"}
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: CONTEXT_TYPEs.WORK_FORM,
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

export default WorkForm;
