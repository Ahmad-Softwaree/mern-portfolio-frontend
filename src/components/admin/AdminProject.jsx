import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Opacity from "../Opacity";
import WantToDelete from "./WantToDelete";
import UpdateProject from "./UpdateProject";

export const AdminProject = ({ index, id, enTitle, arTitle, krTitle, enType, krType, arType, url, image, stacks }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      {wantToDelete && (
        <>
          <Opacity />
          <WantToDelete setWantToDelete={setWantToDelete} id={id} image={image} method={`project`} />
        </>
      )}
      {update && (
        <>
          <Opacity />
          <UpdateProject
            enTitle={enTitle}
            krTitle={krTitle}
            arTitle={arTitle}
            enType={enType}
            krType={krType}
            arType={arType}
            url={url}
            id={id}
            oldStacks={stacks}
            oldImage={image}
            setUpdate={setUpdate}
          />
        </>
      )}
      <div className="projectCard flex flex-row justify-between align-center w-100">
        <span className="tableIndex">{index}</span>
        <span className="tableIndex">{enTitle}</span>

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

AdminProject.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProject);
