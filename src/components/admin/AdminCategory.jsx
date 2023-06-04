import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Opacity from "../Opacity";
import WantToDelete from "./WantToDelete";
import UpdateCategory from "./UpdateCategory";
export const AdminCategory = ({ index, category }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <Opacity />
          <WantToDelete setWantToDelete={setWantToDelete} id={category._id} method={`category`} />
        </>
      )}
      {update && (
        <>
          <Opacity />
          <UpdateCategory setUpdate={setUpdate} oldCategory={category} />
        </>
      )}
      <div className="categoryCard flex flex-row justify-between align-center w-100">
        <span className="tableIndex">{index}</span>
        <span className="tableIndex">{category.enName}</span>

        <div className="flex flex-row justify-center align-center gap-2">
          <span onClick={() => setUpdate(true)} className="tableOperation">
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <span onClick={() => setWantToDelete(true)} className="tableOperation">
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>
    </>
  );
};

AdminCategory.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);
