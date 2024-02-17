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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button as ShadButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Loader } from "../shared";
import { ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTEXT_TYPEs } from "@/context";
import {
  useAddProject,
  useUpdateProject,
} from "@/lib/react-query/query/project.query";
import { useGetConfig } from "@/lib/react-query/query/config.query";
import { QUERY_KEYs } from "@/lib/react-query/types";
import { ENUMs } from "@/lib/enum";
import { LanguageContext } from "@/context/LanguageContext";
const ProjectForm = () => {
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
    state: { projectImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    enTitle: "",
    arTitle: "",
    krTitle: "",
    enDesc: "",
    arDesc: "",
    krDesc: "",
    stacks: [],
    types: [],
    url: "",
    date: "",
  });
  const [gits, setGits] = useState([]);
  const [{ gitName, gitGit }, setGit] = useState({
    gitName: "",
    gitGit: "",
  });
  const { enTitle, arTitle, krTitle, enDesc, arDesc, krDesc, url, date } =
    state;
  const onChange = useCallback((e) => {
    updateState(e.target.name, e.target.value);
  });

  const { mutateAsync, isPending } =
    form_type === "add" ? useAddProject() : useUpdateProject(data?._id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.PROJECT_IMAGE,
      payload: "",
    });
    if (form_type === "update" && data) {
      replaceState({
        enTitle: data?.enTitle,
        arTitle: data?.arTitle,
        krTitle: data?.krTitle,
        enDesc: data?.enDesc,
        arDesc: data?.arDesc,
        krDesc: data?.krDesc,
        types: data?.types.map((val) => val._id),
        stacks: data?.stacks.map((val) => val._id),

        url: data?.url,
        date: data?.date,
      });
      console.log(data);
      setGits(data?.gits);
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
          image: projectImage,
        });
      }}
      className="max-h-[600px] overflow-y-auto fixed inset-0 w-[90%] max-w-[1000px] p-5 rounded-md bg-black-600 text-white-500 z-[1500] m-auto h-fit flex flex-col justify-left items-center gap-5">
      <h1 className="text-body2-semibold md:text-body1-semibold">
        {form_type === "add" ? "Add" : "Update"} Project
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
        <FormLabel mb={`8px`}>English Desc</FormLabel>
        <Textarea
          size={`lg`}
          name="enDesc"
          type="text"
          value={enDesc}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mb={`8px`}>Arabic Desc</FormLabel>
        <Textarea
          size={`lg`}
          name="arDesc"
          type="text"
          value={arDesc}
          onChange={onChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel mb={`8px`}>Kurdish Desc</FormLabel>
        <Textarea
          size={`lg`}
          name="krDesc"
          type="text"
          value={krDesc}
          onChange={onChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Stacks</FormLabel>
        <div className="w-full flex-row justify-start gap-5 flex flex-wrap">
          {stacks?.map((val, index) => {
            return (
              <button
                type="button"
                onClick={(e) => {
                  if (state.stacks.includes(val._id)) {
                    updateState(
                      "stacks",
                      state.stacks.filter((one) => one !== val._id)
                    );
                  } else {
                    updateState("stacks", [...state.stacks, val._id]);
                  }
                }}
                className={`p-2 rounded-lg cursor-pointer  px-3 border-2 border-solid border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 ${
                  state.stacks?.includes(val._id) && "bg-primary-500"
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
      <FormControl>
        <FormLabel>Types</FormLabel>
        <div className="w-full flex-row justify-start gap-5 flex flex-wrap">
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

      <FormControl>
        <FormLabel>Git git</FormLabel>
        <Input
          name="gitGit"
          type="text"
          value={gitGit}
          onChange={(e) =>
            setGit((prev) => ({ ...prev, gitGit: e.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Git name</FormLabel>
        <Input
          name="gitName"
          type="text"
          value={gitName}
          onChange={(e) =>
            setGit((prev) => ({ ...prev, gitName: e.target.value }))
          }
        />
      </FormControl>
      <Button
        onClick={() => {
          if (gitName !== "" && gitGit !== "") {
            setGits((prev) => [...prev, { name: gitName, git: gitGit }]);
            setGit({
              gitName: "",
              gitGit: "",
            });
          }
        }}
        mt={4}
        colorScheme="teal"
        className="w-full p-3"
        type="button">
        Add Git
      </Button>
      {gits.length > 0 && (
        <FormControl>
          <FormLabel>Gits</FormLabel>
          <div className="w-full flex-row justify-start gap-5 flex flex-wrap">
            {gits?.map((val, index) => {
              return (
                <div className="w-full grid grid-cols-2 gap-5 place-items-center">
                  <span
                    className={`col-span-1/2 hover:text-white `}
                    key={index}>
                    {val.name}
                  </span>
                  <Button
                    onClick={() => {
                      setGits((prev) =>
                        prev.filter((one) => one.git !== val.git)
                      );
                    }}
                    className="col-span-1/2"
                    colorScheme="red"
                    type="button">
                    Delete Git
                  </Button>
                </div>
              );
            })}
          </div>
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Date:</FormLabel>
        <Popover className="z-[2000]">
          <PopoverTrigger asChild>
            <ShadButton
              variant={"outline"}
              className={cn(
                "w-full hover:bg-transparent hover:text-white-500 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </ShadButton>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-black-600 text-white-500 p-0 z-[2000]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => {
                updateState("date", e);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <div className="grid !max-w-none !w-full  items-center gap-1.5 bg-black-600">
        <Label htmlFor="picture">Picture</Label>
        <ShadInput
          onChange={(e) => {
            imageDispatch({
              type: CONTEXT_TYPEs.PROJECT_IMAGE,
              payload: e.target.files[0],
            });
          }}
          className="!bg-black-600 !w-full !cursor-pointer"
          id="picture"
          type="file"
        />
      </div>
      {projectImage !== "" && projectImage && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={URL.createObjectURL(projectImage)}
            alt="projectImage"
          />
        </div>
      )}
      {!projectImage && projectImage === "" && data?.imageURL && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={data?.imageURL}
            alt="projectImage"
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
              type: CONTEXT_TYPEs.PROJECT_FORM,
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

export default ProjectForm;
