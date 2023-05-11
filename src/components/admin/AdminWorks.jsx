import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllWorks } from "../../actions/work";
import { Spinner } from "@chakra-ui/react";
import Opacity from "../Opacity";
import CreateWork from "./CreateWork";
import AdminWork from "./AdminWork";

export const AdminWorks = ({ work: { works, workLoading }, getAllWorks }) => {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllWorks({});
  }, []);
  return (
    <div className="admin_works  flex flex-column justify-center align-center gap-1">
      <h1>Works</h1>
      {add && (
        <>
          <Opacity />
          <CreateWork setAdd={setAdd} />
        </>
      )}
      <button onClick={() => setAdd(true)}>
        <i className="fa-solid fa-square-plus"></i>
      </button>

      {workLoading && <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} />}
      {!workLoading && works.length > 0 && (
        <div className="works w-100 flex flex-column justify-left align-center gap-2">
          <div className="workCard workTable flex flex-row justify-between align-center w-100">
            <span className="tableIndex">Id</span>
            <span className="tableIndex">Title</span>
            <span className="tableIndex">Company</span>

            <div className="flex flex-row justify-center align-center gap-2">
              <span className="tableOperation">Update</span>
              <span className="tableOperation">Delete</span>
            </div>
          </div>
          <div className="theProjects flex flex-column justify-left align-center gap-1 w-100">
            {works?.map((work, index) => {
              return (
                <AdminWork
                  index={index}
                  key={index}
                  id={work._id}
                  enTitle={work.enTitle}
                  krTitle={work.krTitle}
                  arTitle={work.arTitle}
                  company={work.company}
                  from={work.from}
                  to={work.to}
                  image={work.image}
                  url={work.url}
                />
              );
            })}
          </div>
        </div>
      )}
      {!workLoading && works.length === 0 && <span className="no_project">There is no work</span>}
    </div>
  );
};

AdminWorks.propTypes = {
  work: PropTypes.object.isRequired,
  getAllWorks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  work: state.work,
});

const mapDispatchToProps = { getAllWorks };

export default connect(mapStateToProps, mapDispatchToProps)(AdminWorks);
