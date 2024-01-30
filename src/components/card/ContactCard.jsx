import useDynamicState from "@/hooks/useDynamicState";
import { useAddSubscriber } from "@/lib/react-query/query/subscribe.query";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdAlternateEmail } from "react-icons/md";

import { Loader } from "../shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

export default function ContactCard() {
  const { state, updateState, replaceState } = useDynamicState({
    email: "",
  });
  const { email } = state;
  const {
    state: { file },
  } = useContext(LanguageContext);
  const { mutateAsync, isPending } = useAddSubscriber(replaceState);
  const handleInputChange = (e) => updateState(e.target.name, e.target.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutateAsync(state);
      }}
      className="p-10 bg-black-600 rounded-md flex flex-col justify-left items-start gap-[10px] col-span-full lg:col-span-1">
      <h1 className="font-bold !text-[20px] text-white-500">
        {file.contact.get}
      </h1>
      <p className="text-white-500 !text-[14px]">{file.contact.sub}</p>

      <FormControl>
        <FormLabel>Email</FormLabel>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdAlternateEmail color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={handleInputChange}
          />{" "}
        </InputGroup>
      </FormControl>
      <Button
        type="submit"
        disabled={isPending}
        size={`md`}
        className="!text-white-500 !bg-primary-500">
        {isPending ? <Loader /> : "Subscribe"}
      </Button>
    </form>
  );
}
