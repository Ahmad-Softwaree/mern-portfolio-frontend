import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { REMOVE_ALL_ERRORS, REMOVE_ALL_SUCCESS, REMOVE_ERROR, REMOVE_SUCCESS } from "../actions/types";
import { useLocation } from "react-router-dom";
import { Progress } from "@chakra-ui/react";
export const Popup = ({ error: { errors }, success: { success } }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: REMOVE_ALL_ERRORS,
    });
  }, [location]);

  return (
    <div className="popup">
      <div className={`back  ${errors.length > 0 || success.length > 0 ? "appear" : "not_appear"}`}></div>
      <div className={`cards ${errors.length > 0 || success.length > 0 ? "appear" : "not_appear"}`}>
        <div className="flex flex-row justify-center items-center w-full gap-2">
          <span
            onClick={() => {
              dispatch({
                type: REMOVE_ALL_ERRORS,
              });
              dispatch({
                type: REMOVE_ALL_SUCCESS,
              });
            }}
            className="remove"
          >
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>

        {errors?.map((err, index) => {
          return (
            <div key={index} className="card error">
              <span className="text">{err.text}</span>
              <Progress className="progress" value={err.time * 20} />

              <span
                onClick={() =>
                  dispatch({
                    type: REMOVE_ERROR,
                    payload: err.id,
                  })
                }
                className="ok"
              >
                Ok
              </span>
            </div>
          );
        })}

        {success?.map((suc, index) => {
          return (
            <div key={index} className="card success">
              <span className="text">{suc.text}</span>
              <Progress className="progress" value={suc.time * 20} />

              <span
                onClick={() =>
                  dispatch({
                    type: REMOVE_SUCCESS,
                    payload: suc.id,
                  })
                }
                className="ok"
              >
                Ok
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Popup.propTypes = {
  error: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  success: state.success,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
