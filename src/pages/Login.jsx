import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../context/actions/adminAction";
import { AlertContext } from "../context/AlertContext";
import { AdminContext } from "../context/AdminContext";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import SpinnerLoading from "../components/global/SpinnerLoading";
export default function Login() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: adminDispatch,
    state: { loginLoading },
  } = useContext(AdminContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const navigate = useNavigate();
  const onChange = useCallback(
    (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    [email, password]
  );

  return (
    <section
      data-aos="fade-up"
      className="w-full bg-black min-h-screen flex flex-row justify-center items-center"
    >
      <form
        data-aos="fade-right"
        onSubmit={(e) => {
          e.preventDefault();
          adminLogin(adminDispatch, alertDispatch, inputs, navigate);
        }}
        className="bg-lightBlack p-5 rounded-lg text-white w-[95%] max-w-[600px] h-fit flex flex-col justify-center items-center gap-[30px] py-[50px]"
      >
        <h1 className="w-full text-center">Admin Login</h1>
        <EmailInput
          name={`email`}
          value={email}
          onChange={onChange}
          title={`Email`}
          className={`w-[300px]`}
        />

        <PasswordInput
          name={`password`}
          value={password}
          onChange={onChange}
          title={`Password`}
          className={`w-[300px]`}
        />

        <button
          className="p-2 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white cursor-pointer"
          disabled={loginLoading}
          type="submit"
        >
          {loginLoading ? <SpinnerLoading size={`30px`} /> : "Login"}
        </button>
      </form>
    </section>
  );
}
