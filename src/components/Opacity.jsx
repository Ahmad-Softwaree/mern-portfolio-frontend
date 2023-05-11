import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Opacity = (props) => {
  return <div className="opaBackground"></div>;
};

Opacity.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Opacity);
