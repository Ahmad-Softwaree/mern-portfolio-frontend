import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import AdminBlogs from "../../components/admin/AdminBlogs";
import AdminProjects from "../../components/admin/AdminProjects";
import AdminWorks from "../../components/admin/AdminWorks";
import AdminStacks from "../../components/admin/AdminStacks";
import AdminCategories from "../../components/admin/AdminCategories";
export const Panel = ({}) => {
  return (
    <section className="panel flex flex-column justify-left align-center w-100">
      <AdminBlogs />
      <AdminProjects />
      <AdminWorks />
      <AdminStacks />
      <AdminCategories />
    </section>
  );
};

Panel.propTypes = {};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
