import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import Opacity from "../Opacity";
import CreateStack from "./CreateStack";
import AdminStack from "./AdminStack";
import { getAllCategories } from "../../actions/category";
import CreateCategory from "./CreateCategory";
import AdminCategory from "./AdminCategory";

export const AdminWorks = ({ category: { categories, loading }, getAllCategories }) => {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllCategories({});
  }, []);
  return (
    <div className="admin_categories  flex flex-column justify-center align-center gap-1">
      <div className="flex flex-row justify-center align-center gap-1 w-100">
        <h1>Categories</h1>
        <button className="uploadButton flex flex-row justify-center align-center" onClick={() => setAdd(true)}>
          <i className="fa-solid fa-upload"></i>
          <span>Upload</span>
        </button>
      </div>

      {add && (
        <>
          <Opacity />
          <CreateCategory setAdd={setAdd} />
        </>
      )}

      {loading && <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} />}
      {!loading && categories.length > 0 && (
        <div className="categories w-100 flex flex-column justify-left align-center gap-2">
          <div className="categoryCard categoryTable flex flex-row justify-between align-center w-100">
            <span className="tableIndex">Id</span>
            <span className="tableIndex">English Name</span>

            <div className="flex flex-row justify-center align-center gap-2">
              <span className="tableOperation">Update</span>
              <span className="tableOperation">Delete</span>
            </div>
          </div>
          <div className="theCategories flex flex-column justify-left align-center gap-1 w-100">
            {categories?.map((category, index) => {
              return <AdminCategory key={index} index={index} category={category} />;
            })}
          </div>
        </div>
      )}
      {!loading && categories.length === 0 && <span className="no_project">There is no category</span>}
    </div>
  );
};

AdminWorks.propTypes = {
  category: PropTypes.object.isRequired,
  getAllCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

const mapDispatchToProps = { getAllCategories };

export default connect(mapStateToProps, mapDispatchToProps)(AdminWorks);
