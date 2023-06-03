import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { login } from "../actions/admin";
import { Spinner } from "@chakra-ui/react";
import { ENGLISH } from "../actions/types";
const Login = React.memo(({ login, admin: { loginLoading } }) => {
  const [{ email, password }, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = useCallback((e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const onKeyDown = useCallback((e) => {
    if (e.keyCode === 13 && !e.shiftKey) login({ email, password, navigate });
  }, []);

  useEffect(() => {
    dispatch({
      type: ENGLISH,
    });
  }, []);

  const animate = (e) => {
    e.target.nextElementSibling.classList.toggle("animateInputTextFocus");
  };
  return (
    <div className="loginPage flex flex-row justify-center align-center w-100 position-relative">
      <Link className="backToHome" to={`/`}>
        <span>
          <i className="fa-solid fa-backward"></i>
        </span>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password, navigate });
        }}
        className="flex flex-column justify-center align-center w-100 gap-2 p-2"
      >
        <div className="loginBox flex flex-column justify-center align-center gap-2">
          <h1>Admin Login</h1>
          <div className="flex flex-row justify-left align-center w-100 position-relative">
            <input
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={animate}
              onFocus={animate}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="emailInput"
            />
            <span className="animateInputText position-absolute">Your Email:</span>
          </div>

          <div className="w-100 flex flex-row justify-between align-center passwordInput position-relative">
            <input
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={animate}
              onFocus={animate}
              value={password}
              placeholder="Enter the password"
              type={show ? "text" : "password"}
              name="password"
              id="password"
              className="w-100"
            />
            <span className="animateInputText position-absolute">Your Password:</span>
            {!show ? (
              <i onClick={() => setShow(true)} className="fa-solid fa-eye"></i>
            ) : (
              <i onClick={() => setShow(false)} className="fa-solid fa-eye-slash"></i>
            )}
          </div>
          <button disabled={loginLoading} type="submit">
            {loginLoading ? <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
