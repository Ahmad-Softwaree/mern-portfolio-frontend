import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Opacity from "../Opacity";
import WantToDelete from "./WantToDelete";
import UpdateStack from "./UpdateStack";
export const AdminStack = ({ index, id, name, color }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <Opacity />
          <WantToDelete setWantToDelete={setWantToDelete} id={id} method={`stack`} />
        </>
      )}
      {update && (
        <>
          <Opacity />
          <UpdateStack setUpdate={setUpdate} oldStack={{ name, color }} id={id} />
        </>
      )}
      <div className="stackCard flex flex-row justify-between align-center w-100">
        <span className="tableIndex">{index}</span>
        <span className="tableIndex">{name}</span>
        <span className="tableIndex">{color}</span>

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

AdminStack.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminStack);
