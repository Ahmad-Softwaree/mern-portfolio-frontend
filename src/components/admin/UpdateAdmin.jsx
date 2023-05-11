import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { updateAdmin } from "../../actions/admin";
import { ADMIN_UPDATE_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";

const UpdateAdmin = ({ name, email, id, image, oldImage, updateAdmin, admin: { users, updateLoading }, setUpdate, admin: { user } }) => {
  const [imageChanged, setImageChanged] = useState(false);

  const [inputs, setInputs] = useState({
    name: name,
    email: email,
  });

  const dispatch = useDispatch();
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      updateAdmin({
        name: inputs.name,
        email: inputs.email,
        image: image.updateAdmin,
        oldImage,
        setInputs,
        setUpdate,
        adminId: id,
        imageChanged,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateAdmin({
          name: inputs.name,
          email: inputs.email,
          image: image.updateAdmin,
          oldImage,
          setInputs,
          setUpdate,
          adminId: id,
          imageChanged,
        });
      }}
      className="createAdmin position-fixed flex flex-column justify-left align-center w-100 gap-2 update"
    >
      <h1>update Admin</h1>

      <div className="inner">
        <div className="fileInputDiv flex flex-column justify-center align-center gap-1">
          {!image.updateAdmin ? (
            <>
              <input
                onChange={(e) => {
                  dispatch({
                    type: ADMIN_UPDATE_IMAGE,
                    payload: e.target.files[0],
                  });
                  setImageChanged(true);
                }}
                type="file"
                name="admin"
                id="updateAdmin"
                className="adminImage"
              />

              <img className="URLImage" src={`${oldImage}`} alt="imageUpload" />

              <label className="blogImageUploaderLabel flex justify-center align-center flex-row" htmlFor="updateAdmin">
                <div className="editButton flex flex-row align-center  justify-center">
                  <img src="/images/edit.svg" alt="editImage" className="editImage" />
                  <span>Edit</span>
                </div>
              </label>
            </>
          ) : (
            <div className="URLImage position-relative">
              <img className="URLImage" src={URL.createObjectURL(image.updateAdmin)} alt="imageUpload" />
              <span
                onClick={() => {
                  dispatch({ type: ADMIN_UPDATE_IMAGE, payload: null });
                  setImageChanged(false);
                }}
                className="position-absolute x"
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          )}
        </div>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.name}
          placeholder="Enter the name"
          type="text"
          name="name"
          id="name"
          className={inputs.name !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputs.email}
          placeholder="Enter the email"
          type="email"
          name="email"
          id="email"
          className={inputs.email !== "" ? "activeInputBorder" : ""}
        />

        <div className="publishAndCancel flex flex-row justify-center align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setUpdate(false);
              dispatch({ type: ADMIN_UPDATE_IMAGE, payload: null });
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            disabled={updateLoading}
            className={inputs.name !== "" && inputs.email !== "" ? "activePublish" : "publish"}
          >
            {updateLoading ? (
              <div className="w-100">
                <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

UpdateAdmin.propTypes = {
  updateAdmin: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.image,
  admin: state.admin,
});

const mapDispatchToProps = { updateAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAdmin);
