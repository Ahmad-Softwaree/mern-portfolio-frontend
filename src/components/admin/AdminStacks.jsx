import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import Opacity from "../Opacity";
import CreateWork from "./CreateWork";
import { getAllStacks } from "../../actions/stack";
import CreateStack from "./CreateStack";
import AdminStack from "./AdminStack";

export const AdminWorks = ({ stack: { stacks, loading }, getAllStacks }) => {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllStacks({});
  }, []);
  return (
    <div className="admin_stacks  flex flex-column justify-center align-center gap-1">
      <div className="flex flex-row justify-center align-center gap-1 w-100">
        <h1>Stack</h1>
        <button className="uploadButton flex flex-row justify-center align-center" onClick={() => setAdd(true)}>
          <i className="fa-solid fa-upload"></i>
          <span>Upload</span>
        </button>
      </div>

      {add && (
        <>
          <Opacity />
          <CreateStack setAdd={setAdd} />
        </>
      )}

      {loading && <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} />}
      {!loading && stacks.length > 0 && (
        <div className="stacks w-100 flex flex-column justify-left align-center gap-2">
          <div className="stackCard stackTable flex flex-row justify-between align-center w-100">
            <span className="tableIndex">Id</span>
            <span className="tableIndex">Name</span>
            <span className="tableIndex">Color</span>

            <div className="flex flex-row justify-center align-center gap-2">
              <span className="tableOperation">Update</span>
              <span className="tableOperation">Delete</span>
            </div>
          </div>
          <div className="theStacks flex flex-column justify-left align-center gap-1 w-100">
            {stacks?.map((stack, index) => {
              return <AdminStack key={index} index={index} id={stack._id} name={stack.name} color={stack.color} />;
            })}
          </div>
        </div>
      )}
      {!loading && stacks.length === 0 && <span className="no_project">There is no stack</span>}
    </div>
  );
};

AdminWorks.propTypes = {
  stack: PropTypes.object.isRequired,
  getAllStacks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stack: state.stack,
});

const mapDispatchToProps = { getAllStacks };

export default connect(mapStateToProps, mapDispatchToProps)(AdminWorks);
