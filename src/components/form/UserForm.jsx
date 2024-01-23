import { ImageContext } from "@/context/ImageContext";
import { UiContext } from "@/context/UiContext";
import useDynamicState from "@/hooks/useDynamicState";
import { useAddUser, useUpdateUser } from "@/lib/react-query/query/user.query";
import { useCallback, useContext, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Loader } from "../shared";
import { ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTEXT_TYPEs } from "@/context";
const UserForm = () => {
  const {
    dispatch,
    state: { type, id, data },
  } = useContext(UiContext);
  const {
    dispatch: imageDispatch,
    state: { userImage },
  } = useContext(ImageContext);
  const { state, updateState, replaceState } = useDynamicState({
    name: "",
    email: "",
    password: "",
    bio: "",
    url: "",
  });
  const { name, email, password, bio, url } = state;
  const onChange = useCallback((e) => {
    updateState(e.target.name, e.target.value);
  });

  const { mutateAsync, isPending } =
    type === "add" ? useAddUser() : useUpdateUser(data?._id);

  useEffect(() => {
    imageDispatch({
      type: CONTEXT_TYPEs.USER_IMAGE,
      payload: "",
    });
    if (type === "update" && data) {
      replaceState({
        name: data?.name,
        email: data?.email,
        password: "",
        bio: data?.bio,
        url: data?.url,
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
          image: userImage,
        });
      }}
      className="fixed inset-0 w-[90%] max-w-[1000px] max-h-[600px] overflow-y-auto !text-white-500 p-5 rounded-md bg-black-600 z-[1500] m-auto h-fit flex flex-col justify-left items-center gap-5">
      <h1 className="text-body2-semibold md:text-body1-semibold">
        {type === "add" ? "Add" : "Update"} Admin
      </h1>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input name="name" type="text" value={name} onChange={onChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" value={email} onChange={onChange} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
      </FormControl>
      <div className="grid w-full  items-center gap-1.5 bg-black-600">
        <Label htmlFor="picture">Picture</Label>
        <ShadInput
          onChange={(e) => {
            imageDispatch({
              type: CONTEXT_TYPEs.USER_IMAGE,
              payload: e.target.files[0],
            });
          }}
          className="!bg-black-600 !cursor-pointer"
          id="picture"
          type="file"
        />
      </div>
      {userImage !== "" && userImage && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={URL.createObjectURL(userImage)}
            alt="userImage"
          />
        </div>
      )}
      {!userImage && userImage === "" && data?.imageURL && (
        <div className="relative w-full max-h-[100px] rounded-md">
          <img
            className="w-full max-h-[100px] object-contain"
            src={data?.imageURL}
            alt="userImage"
          />
        </div>
      )}
      <FormControl isRequired>
        <FormLabel>Bio</FormLabel>
        <Textarea
          className="!rounded-md"
          value={bio}
          name="bio"
          onChange={onChange}
          placeholder="Add Your bio here"
          size="sm"
        />
      </FormControl>
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
              type: CONTEXT_TYPEs.USER_FORM,
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

export default UserForm;
