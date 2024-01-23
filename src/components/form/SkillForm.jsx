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
import {
  useAddSkill,
  useUpdateSkill,
} from "@/lib/react-query/query/skill.query";
import { useGetConfig } from "@/lib/react-query/query/config.query";
import { QUERY_KEYs } from "@/lib/react-query/types";
import { ENUMs } from "@/lib/enum";
import { LanguageContext } from "@/context/LanguageContext";
import { Diversity1Sharp } from "@mui/icons-material";
const SkillForm = () => {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  const { data: types } = useGetConfig(QUERY_KEYs.TYPES, ENUMs.TYPE);
  const { data: stacks } = useGetConfig(QUERY_KEYs.STACKS, ENUMs.STACK);
  const {
    dispatch,
    state: { type: form_type, id, data },
  } = useContext(UiContext);
  const {
    dispatch: imageDispatch,
    state: { skillImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    name: "",
    types: [],
  });

  const { name } = state;
  const onChange = useCallback((e) => {
    updateState(e.target.name, e.target.value);
  });

  const { mutateAsync, isPending } =
    form_type === "add" ? useAddSkill() : useUpdateSkill(data?._id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.SKILL_IMAGE,
      payload: "",
    });
    if (form_type === "update" && data) {
      replaceState({
        name: data?.name,
        types: data?.types.map((val) => val._id),
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
          image: skillImage,
        });
      }}
      className="max-h-[600px] overflow-y-auto fixed inset-0 w-[90%] max-w-[1000px] p-5 rounded-md bg-black-600 text-white-500 z-[1500] m-auto h-fit flex flex-col justify-left items-center gap-5">
      <h1 className="text-body2-semibold md:text-body1-semibold">
        {form_type === "add" ? "Add" : "Update"} Skill
      </h1>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input name="name" type="text" value={name} onChange={onChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Types</FormLabel>
        <div className="w-full flex flex-row justify-start gap-5 flex-wrap">
          {types?.map((val, index) => {
            return (
              <button
                type="button"
                onClick={(e) => {
                  if (state.types.includes(val._id)) {
                    updateState(
                      "types",
                      state.types.filter((one) => one !== val._id)
                    );
                  } else {
                    updateState("types", [...state.types, val._id]);
                  }
                }}
                className={`p-2 rounded-lg cursor-pointer  px-3 border-2 border-solid border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 ${
                  state.types?.includes(val._id) && "bg-primary-500"
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

      <div className="grid !max-w-none !w-full  items-center gap-1.5 bg-black-600">
        <Label htmlFor="picture">Picture</Label>
        <ShadInput
          onChange={(e) => {
            imageDispatch({
              type: CONTEXT_TYPEs.SKILL_IMAGE,
              payload: e.target.files[0],
            });
          }}
          className="!bg-black-600 !w-full !cursor-pointer"
          id="picture"
          type="file"
        />
      </div>
      {skillImage !== "" && skillImage && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={URL.createObjectURL(skillImage)}
            alt="skillImage"
          />
        </div>
      )}
      {!skillImage && skillImage === "" && data?.imageURL && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={data?.imageURL}
            alt="skillImage"
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
              type: CONTEXT_TYPEs.SKILL_FORM,
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

export default SkillForm;
