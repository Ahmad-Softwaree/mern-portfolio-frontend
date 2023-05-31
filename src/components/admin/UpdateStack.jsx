import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { updateStack } from "../../actions/stack";
const UpdateStack = ({ oldStack, id, updateStack, stack: { stacks, updateLoading }, setUpdate, admin: { user } }) => {
  const [{ name, color }, setInputs] = useState({
    name: oldStack.name,
    color: oldStack.color,
  });
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onKeyDown = (e) => {
    if (e.key === "13" && !e.shiftKey) {
      updateStack({ stackId: id, name, color, setUpdate });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateStack({ stackId: id, name, color, setUpdate });
      }}
      className="createStack position-fixed flex flex-column justify-center align-center w-100 gap-2"
    >
      <h1>Update Stack</h1>
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
              setUpdate(false);
            }}
          >
            Cancel
          </span>
          <button type="submit" disabled={updateLoading} className={name !== "" && color !== "" ? "activePublish" : "publish"}>
            {updateLoading ? (
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

UpdateStack.propTypes = {
  updateStack: PropTypes.func.isRequired,
  stack: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stack: state.stack,
  admin: state.admin,
});

const mapDispatchToProps = { updateStack };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStack);
