import React from "react";
import AdminBlogs from "../../components/admin/AdminBlogs";
import OverView from "../../components/admin/OverView";
import AdminProjects from "../../components/admin/AdminProjects";
import AdminWorks from "../../components/admin/AdminWorks";
import AdminStacks from "../../components/admin/AdminStacks";
import AdminCategories from "../../components/admin/AdminCategories";
import AdminTypes from "../../components/admin/AdminTypes";
import AdminSkills from "../../components/admin/AdminSkills";
import AdminCertificates from "../../components/admin/AdminCertificates";
export default function Panel() {
  return (
    <section
      data-aos="fade-up"
      className="w-full admin min-h-screen flex flex-col justify-left items-center gap-[50px] overflow-hidden pl-[150px] pr-[50px] pb-[400px] bg-lightBlack"
    >
      <OverView />
      <AdminBlogs />
      <AdminProjects />
      <AdminWorks />
      <AdminSkills />
      <AdminCertificates />
      <AdminCategories />
      <AdminTypes />
      <AdminStacks />
    </section>
  );
}
