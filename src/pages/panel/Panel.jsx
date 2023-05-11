import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import AdminBlogs from "../../components/admin/AdminBlogs";
import AdminProjects from "../../components/admin/AdminProjects";
import AdminWorks from "../../components/admin/AdminWorks";
export const Panel = ({}) => {
  return (
    <section className="panel flex flex-column justify-left align-center w-100">
      <AdminBlogs />
      <AdminProjects />
      <AdminWorks />
    </section>
  );
};

Panel.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
