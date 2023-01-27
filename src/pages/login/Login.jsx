import React from "react";
import { useSelector, useDispatch } from "react-redux";
import loginRequest from "../../redux/axios/login/loginRequest";
import { handleInput, handleLogin } from "../../redux/features/login/loginSlice";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import setCookie from "../../cookie/setCookie";
const Login = () => {
  //navigator
  const navigate = useNavigate();
  //use redux toolkit to handle the input states
  const { email, password, fetching, errors } = useSelector((state) => {
    return state.login;
  });
  const dispatch = useDispatch();
  const change = (e) =>
    dispatch(
      handleInput({
        name: e.target.name,
        value: e.target.value,
      })
    );

  //key down event
  const keyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      e.preventDefault();
      login();
    }
  };

  //login function
  const login = async (e) => {
    //start login
    dispatch(handleLogin({ type: "START", payload: true }));
    const res = await loginRequest({
      email,
      password,
    });

    //fail login
    if (res.request?.status === 400) return dispatch(handleLogin({ type: "FAIL", payload: false, errors: res.response.data }));

    if (res.request?.status === 500) return console.log(res);

    // handle successful login
    dispatch(handleLogin({ type: "DONE", payload: false, errors: {} }));
    setCookie("admin", res.token);
    navigate("/");
  };

  return (
    <section className="login flex flex-column justify-center align-center w-100 gap-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="loginBox flex flex-column justify-left align-center gap-3"
      >
        <h1>Login Admin</h1>
        <div className="w-100">
          {" "}
          <input onKeyDown={keyDown} onChange={change} value={email} type="email" name="email" id="email" placeholder="your email..." />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="w-100">
          <input
            onKeyDown={keyDown}
            onChange={change}
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button disabled={fetching} type="submit">
          {fetching ? <Spinner /> : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
