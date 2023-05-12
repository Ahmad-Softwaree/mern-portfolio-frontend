import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Opacity from "../Opacity";
import WantToDelete from "./WantToDelete";
import UpdateWork from "./UpdateWork";
export const AdminWork = ({ index, id, enTitle, arTitle, krTitle, company, from, to, image }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <Opacity />
          <WantToDelete setWantToDelete={setWantToDelete} id={id} image={image} blog={false} work={true} />
        </>
      )}
      {update && (
        <>
          <Opacity />
          <UpdateWork
            enTitle={enTitle}
            krTitle={krTitle}
            arTitle={arTitle}
            company={company}
            from={from}
            to={to}
            id={id}
            oldImage={image}
            setUpdate={setUpdate}
          />
        </>
      )}
      <div className="workCard flex flex-row justify-between align-center w-100">
        <span className="tableIndex">{index}</span>
        <span className="tableIndex">{company}</span>

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

AdminWork.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminWork);
