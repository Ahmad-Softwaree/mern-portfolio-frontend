import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { PROJECT_IMAGE } from "../../actions/types";
import { Spinner } from "@chakra-ui/react";
import { createStack } from "../../actions/stack";
const CreateStack = ({ createStack, stack: { stacks, createLoading }, setAdd, admin: { user } }) => {
  const [{ name, color }, setInputs] = useState({
    name: "",
    color: "",
  });
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      createStack({ name, color, setAdd });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createStack({ name, color, setAdd });
      }}
      className="createStack position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Create Stack</h1>
      <div className="inner">
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={name}
          placeholder="Enter name of stack"
          type="text"
          name="name"
          id="name"
          className={name !== "" ? "activeInputBorder" : ""}
        />

        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={color}
          placeholder="Enter stack color"
          name="color"
          id="color"
          className={color !== "" ? "activeInputBorder" : null}
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
          <button type="submit" disabled={createLoading} className={name !== "" && color !== "" ? "activePublish" : "publish"}>
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

CreateStack.propTypes = {
  createStack: PropTypes.func.isRequired,
  stack: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stack: state.stack,
  admin: state.admin,
});

const mapDispatchToProps = { createStack };

export default connect(mapStateToProps, mapDispatchToProps)(CreateStack);
