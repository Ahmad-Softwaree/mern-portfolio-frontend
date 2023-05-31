import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { getAllBlogsForPanel } from "../../actions/admin";
import AdminBlog from "./AdminBlog";
import Opacity from "../Opacity";
import CreateBlog from "../../pages/admin/CreateBlog";
import { Link } from "react-router-dom";
export const AdminBlogs = ({ blog: { blogs, blogLoading }, getAllBlogsForPanel }) => {
  useEffect(() => {
    getAllBlogsForPanel({});
  }, []);
  return (
    <div className="admin_blogs  flex flex-column justify-center align-center gap-1">
      <div className="flex flex-row justify-center align-center gap-1 w-100">
        <h1>Blogs</h1>
        <Link to={`create_blog`} className="uploadButton flex flex-row justify-center align-center" onClick={() => setAdd(true)}>
          <i className="fa-brands fa-blogger"></i>
          <span>Create</span>
        </Link>
      </div>
      {blogLoading && <Spinner minWidth={`20px`} minHeight={`20px`} size={`lg`} />}
      {!blogLoading && blogs.length > 0 && (
        <div className="blogs w-100 flex flex-column justify-left align-center gap-1">
          <div className="blogCard blogTable flex flex-row justify-between align-center w-100">
            <span className="tableIndex">Id</span>
            <span className="tableIndex">Title</span>
            <div className="flex flex-row justify-center align-center gap-2">
              <span className="tableOperation">Update</span>
              <span className="tableOperation">Delete</span>
            </div>
          </div>
          <div className="theBlogs flex flex-column justify-left align-center gap-1 w-100">
            {blogs?.map((blog, index) => {
              return (
                <AdminBlog
                  index={index}
                  key={index}
                  id={blog._id}
                  enTitle={blog.enTitle}
                  krTitle={blog.krTitle}
                  arTitle={blog.arTitle}
                  enBody={blog.enBody}
                  krBody={blog.krBody}
                  arBody={blog.arBody}
                  image={blog.image}
                />
              );
            })}
          </div>
        </div>
      )}
      {!blogLoading && blogs.length === 0 && <span className="no_blog">There is no blog</span>}
    </div>
  );
};

AdminBlogs.propTypes = {
  blog: PropTypes.object.isRequired,
  getAllBlogsForPanel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
});

const mapDispatchToProps = { getAllBlogsForPanel };

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogs);
