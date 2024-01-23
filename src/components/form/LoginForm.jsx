import { useCallback } from "react";
import useDynamicState from "./../../hooks/useDynamicState";
import { useLogin } from "../../lib/react-query/query/auth.query";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { Loader } from "../shared";
import Logo from "../shared/Logo";
const LoginForm = () => {
  const { state, updateState } = useDynamicState({
    email: "",
    password: "",
  });
  const onChange = useCallback((e) =>
    updateState(e.target.name, e.target.value)
  );

  const { mutateAsync, isPending } = useLogin();

  const { email, password } = state;

  const isError = email === "" || password === "";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutateAsync(state);
      }}
      className="bg-niceBlack border-2 border-solid border-primary-500 shadow-xl text-white-500-500 p-10 rounded-md flex flex-col justify-left items-center gap-10 w-[90%] max-w-[500px]">
      <Logo className={`text-white-500`} size="xl" />
      <FormControl className="text-white-500" isRequired isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" value={email} onChange={onChange} />
        {isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
      </FormControl>
      <FormControl className="text-white-500" isRequired isInvalid={isError}>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        {isError && <FormErrorMessage>Password is required.</FormErrorMessage>}
      </FormControl>
      <Button
        mt={4}
        className="!bg-primary-500 !text-white-500-500 w-full"
        isLoading={isPending}
        type="submit">
        {isPending ? <Loader /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
