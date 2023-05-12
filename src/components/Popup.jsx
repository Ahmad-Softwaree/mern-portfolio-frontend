import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { REMOVE_ALL_ERRORS, REMOVE_ALL_SUCCESS, REMOVE_ERROR, REMOVE_SUCCESS } from "../actions/types";
import { useLocation } from "react-router-dom";

export const Popup = ({ error: { errors }, success: { success } }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: REMOVE_ALL_ERRORS,
    });
  }, [location]);

  return (
    <div className={`popup_cards ${errors.length > 0 || success.length > 0 ? "appear" : "not_appear"}`}>
      {errors?.map((err, index) => {
        return (
          <div
            onClick={() =>
              dispatch({
                type: REMOVE_ERROR,
                payload: err.id,
              })
            }
            key={index}
            className="card error flex flex-row justify-left align-center flex-wrap position-relative"
          >
            <div style={{ width: `${err.time * 20}%` }} className="progress"></div>
            <span>
              <i className="fa-solid fa-bug"></i>
            </span>
            <span className="text">{err.text}</span>
          </div>
        );
      })}

      {success?.map((suc, index) => {
        return (
          <div
            onClick={() =>
              dispatch({
                type: REMOVE_SUCCESS,
                payload: suc.id,
              })
            }
            key={index}
            className="card success flex flex-row justify-left align-center flex-wrap position-relative"
          >
            <div style={{ width: `${suc.time * 20}%` }} className="progress"></div>
            <span>
              <i className="fa-solid fa-square-check"></i>
            </span>
            <span className="text">{suc.text}</span>
          </div>
        );
      })}
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
