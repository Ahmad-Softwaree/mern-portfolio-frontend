import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/blogs/Blogs";
import Landing from "./pages/landing/Landing";
import ErrorPage from "./error/ErrorPage";
import Error from "./error/Error";
import "./language/i18react.js";
import { useTranslation } from "react-i18next";
import { getBlogs } from "./actions/blog";
import { getProjects } from "./actions/project";
import { getWorks } from "./actions/work";
import Fallback from "./pages/Fallback";
import SingleBlogPage from "./pages/singleBlog/SingleBlogPage";
import { connect } from "react-redux";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_LOCAL_HOST;

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* home route */}
      <Route path="/" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={true} />} errorElement={<Error />}>
        <Route index element={<Landing BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
      </Route>

      {/* blogs routes */}
      <Route path="/blogs" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={false} />} errorElement={<Error />}>
        {/* single blog  route */}
        <Route index element={<Blogs BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
        <Route path=":id" element={<SingleBlogPage BACKEND_HOST={BACKEND_HOST} errorElement={<Error />} />} />
      </Route>

      {/* page 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

function App({ blogDone, projectDone, workDone }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language === "kr" || i18n.language === "ar") {
      document.body.style.direction = "rtl";
      document.body.style.fontFamily = "rabar-39";
    } else {
      document.body.style.direction = "ltr";
      document.body.style.fontFamily = "Karla";
    }
  }, [i18n.language]);

  useEffect(() => {
    getBlogs();
    getWorks();
    getProjects();
  }, []);

  return <div className="App">{!blogDone || !projectDone || !workDone ? <Fallback /> : <RouterProvider router={routes} />}</div>;
}

const mapStateToProps = (state) => ({
  blogDone: state.blog.done,
  projectDone: state.project.done,
  workDone: state.work.done,
});

export default connect(mapStateToProps, {
  getBlogs,
  getWorks,
  getProjects,
})(App);
