import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const TextDecoration = ({ handleBoldClick, handleItalicClick, lang }) => {
  return (
    <div className="text_decoration flex flex-row w-full justify-left items-center gap-2 fixed bottom-0">
      <span onClick={handleBoldClick}>
        <i className="fa-solid fa-bold"></i>
      </span>
      <span onClick={handleItalicClick}>
        <i className="fa-solid fa-italic"></i>
      </span>
      <span>
        <i className="fa-solid fa-underline"></i>
      </span>
      <span>
        <i className="fa-solid fa-link"></i>
      </span>
      <span>
        <i className="fa-solid fa-font"></i>
      </span>
      <span>
        <i className="fa-solid fa-text-height"></i>
      </span>
      <span>
        <i className="fa-solid fa-highlighter"></i>
      </span>
      <span>
        <i className="fa-solid fa-heading"></i>
      </span>
      <span>
        <i className="fa-solid fa-list"></i>
      </span>
      <span>
        <i className="fa-solid fa-list-ol"></i>
      </span>
    </div>
  );
};

TextDecoration.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TextDecoration);
