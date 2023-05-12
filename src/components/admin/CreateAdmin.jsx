import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createAdmin } from "../../actions/admin";
import { ADMIN_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";

const CreateAdmin = ({ image: { admin }, createAdmin, admin: { users, createLoading }, setAdd, admin: { user } }) => {
  const [{ name, email, password }, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      createAdmin({ name, email, password, image: admin, setInputs });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createAdmin({ name, email, password, image: admin, setInputs });
      }}
      className="createAdmin position-fixed flex flex-column justify-left align-center w-100 gap-2"
    >
      <h1>Create Admin</h1>

      <div className="inner">
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!admin ? (
            <>
              <input
                onChange={(e) =>
                  dispatch({
                    type: ADMIN_IMAGE,
                    payload: e.target.files[0],
                  })
                }
                type="file"
                name="admin"
                id="adminImage"
                className="adminImage"
              />

              <img className="imageUploadCloud" src="/images/uploadImage.svg" alt="imageUpload" />
              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="adminImage">
                <span className="imageUploadButton">Upload an Image</span>
              </label>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(admin)} alt="imageUpload" />
              <span onClick={() => dispatch({ type: ADMIN_IMAGE, payload: null })} className="position-absolute x">
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          )}
        </div>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={name}
          placeholder="Enter the name"
          type="text"
          name="name"
          id="name"
          className={name !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={email}
          placeholder="Enter the email"
          type="email"
          name="email"
          id="email"
          className={email !== "" ? "activeInputBorder" : ""}
        />
        <div className="w-100 flex flex-row justify-between align-center passwordInput">
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={password}
            placeholder="Enter the password"
            type={show ? "text" : "password"}
            name="password"
            id="password"
            className={password !== "" ? "activeInputBorder w-100" : "w-100"}
          />
          {!show ? (
            <i onClick={() => setShow(true)} className="fa-solid fa-eye"></i>
          ) : (
            <i onClick={() => setShow(false)} className="fa-solid fa-eye-slash"></i>
          )}
        </div>

        <div className="publishAndCancel flex flex-row justify-center align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setAdd(false);
              dispatch({ type: ADMIN_IMAGE, payload: null });
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            disabled={createLoading}
            className={name !== "" && email !== "" && password !== "" ? "activePublish" : "publish"}
          >
            {createLoading ? (
              <div className="w-100 loadingSpinner">
                <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
              </div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

CreateAdmin.propTypes = {
  createAdmin: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.image,
  admin: state.admin,
});

const mapDispatchToProps = { createAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);
