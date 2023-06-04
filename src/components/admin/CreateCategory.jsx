import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { createCategory } from "../../actions/category";
const CreateCategory = ({ createCategory, category: { categories, createLoading }, setAdd, admin: { user } }) => {
  const [{ enName, arName, krName }, setInputs] = useState({
    enName: "",
    arName: "",
    krName: "",
  });
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      createCategory({ enName, arName, krName, setAdd });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCategory({ enName, arName, krName, setAdd });
      }}
      className="createCategory position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Create Category</h1>
      <div className="inner">
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={enName}
          placeholder="Enter English Category name"
          type="text"
          name="enName"
          id="enName"
          className={enName !== "" ? "activeInputBorder" : ""}
        />

        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={arName}
          placeholder="Enter Arabic Category name"
          type="text"
          name="arName"
          id="arName"
          className={arName !== "" ? "activeInputBorder" : ""}
        />
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={krName}
          placeholder="Enter Kurdish Category name"
          type="text"
          name="krName"
          id="krName"
          className={krName !== "" ? "activeInputBorder" : ""}
        />
        <div className="publishAndCancel flex flex-row justify-center align-center gap-2">
          <span
            className="cancelLink"
            onClick={() => {
              setAdd(false);
            }}
          >
            Cancel
          </span>
          <button
            type="submit"
            disabled={createLoading}
            className={enName !== "" && arName !== "" && krName !== "" ? "activePublish" : "publish"}
          >
            {createLoading ? (
              <div className="w-100 loadingSpinner">
                <Spinner minWidth={`10px`} minHeight={`10px`} size={`sm`} />
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  admin: state.admin,
});

const mapDispatchToProps = { createCategory };

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
