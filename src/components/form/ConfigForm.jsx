import { UiContext } from "@/context/UiContext";
import useDynamicState from "@/hooks/useDynamicState";
import {
  useAddConfig,
  useUpdateConfig,
} from "@/lib/react-query/query/config.query";
import { useCallback, useContext, useEffect } from "react";
import { Loader } from "../shared";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import { CONTEXT_TYPEs } from "@/context";
import { ENUMs } from "@/lib/enum";
import { Label } from "@/components/ui/label";
import { ShadInput } from "@/components/ui/input";
import { ImageContext } from "@/context/ImageContext";

export default function ConfigForm() {
  const {
    dispatch,
    state: { type: form_type, data, id, config, qKey },
  } = useContext(UiContext);
  const {
    dispatch: imageDispatch,
    state: { stackImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    enName: "",
    arName: "",
    krName: "",
    type: config,
    color: "",
  });
  const { enName, color, arName, krName, type } = state;
  const onChange = useCallback((e) =>
    updateState(e.target.name, e.target.value)
  );

  const { mutateAsync, isPending } =
    form_type === "add" ? useAddConfig(qKey) : useUpdateConfig(qKey, id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.STACK_IMAGE,
      payload: "",
    });
    if (data && form_type === "update") {
      replaceState({
        enName: data?.enName,
        arName: data?.arName,
        krName: data?.krName,
        type: config,
        color: data?.color,
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
          image: stackImage,
        });
      }}
      data-aos="fade-up"
      className="fixed inset-0 w-fit h-fit p-4 rounded-lg bg-white-500 text-primary-500 flex flex-col justify-center items-center gap-[30px] z-[1500] m-auto"
    >
      <h2>{form_type === "add" ? "Add" : "Update"} Config</h2>
      <FormControl isRequired>
        <FormLabel>English Name</FormLabel>

        <Input
          value={enName}
          onChange={onChange}
          name={`enName`}
          placeholder="English Name"
        />
      </FormControl>
      {config !== ENUMs.STACK ? (
        <>
          <FormControl isRequired>
            <FormLabel>Arabic Name</FormLabel>

            <Input
              value={arName}
              onChange={onChange}
              name={`arName`}
              placeholder="Arabic Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Kurdish Name</FormLabel>

            <Input
              value={krName}
              onChange={onChange}
              name={`krName`}
              placeholder="Kurdish Name"
            />
          </FormControl>
        </>
      ) : (
        <>
          <FormControl isRequired>
            <FormLabel>Color</FormLabel>

            <Input
              value={color}
              onChange={onChange}
              name={`color`}
              placeholder="Color"
            />
          </FormControl>
          <div className="grid !max-w-none !w-full  items-center gap-1.5 bg-white-500">
            <Label htmlFor="picture">Picture</Label>
            <ShadInput
              onChange={(e) => {
                imageDispatch({
                  type: CONTEXT_TYPEs.STACK_IMAGE,
                  payload: e.target.files[0],
                });
              }}
              className="!bg-white-500 !w-full !cursor-pointer"
              id="picture"
              type="file"
            />
          </div>
          {stackImage !== "" && stackImage && (
            <div className="relative w-full max-h-[100px] rounded-md">
              <img
                className="w-full max-h-[100px] object-contain"
                src={URL.createObjectURL(stackImage)}
                alt="stackImage"
              />
            </div>
          )}
          {!stackImage && stackImage === "" && data?.imageURL && (
            <div className="relative w-full max-h-[100px] rounded-md">
              <img
                className="w-full max-h-[100px] object-contain"
                src={data?.imageURL}
                alt="stackImage"
              />
            </div>
          )}
        </>
      )}

      <div className="w-full flex flex-row justify-center items-center gap-10">
        <Button mt={4} colorScheme="teal" isLoading={isPending} type="submit">
          {isPending ? <Loader /> : "Submit"}
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: CONTEXT_TYPEs.CONFIG_FORM,
            })
          }
          mt={4}
          colorScheme="red"
          type="button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
