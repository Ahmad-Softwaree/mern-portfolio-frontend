import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Opacity from "../Opacity";
import WantToDelete from "./WantToDelete";
import { Link } from "react-router-dom";
export const AdminBlog = ({ index, id, enTitle, arTitle, krTitle, enBody, krBody, arBody, image }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <Opacity />
          <WantToDelete setWantToDelete={setWantToDelete} id={id} image={image} method={`blog`} />
        </>
      )}

      <div className="blogCard flex flex-row justify-between align-center w-100">
        <span className="tableIndex">{index}</span>
        <span className="tableIndex">{enTitle}</span>
        <div className="flex flex-row justify-center align-center gap-2">
          <Link to={`update_blog/${id}`} className="tableOperation">
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <span onClick={() => setWantToDelete(true)} className="tableOperation">
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>
    </>
  );
};

AdminBlog.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlog);
