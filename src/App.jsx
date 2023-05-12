import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/blogs/Blogs";
import Landing from "./pages/landing/Landing";
import ErrorPage from "./error/ErrorPage";
import Error from "./error/Error";
import SingleBlogPage from "./pages/singleBlog/SingleBlogPage";
import Universal from "./components/Universal";
import Panel from "./pages/panel/Panel";
import Login from "./pages/Login";
import AdminRoutes from "./routes/AdminRoutes";
import Admins from "./pages/admin/Admins";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Universal />}>
      {/* home route */}
      <Route path="/" element={<Layout isHome={true} />} errorElement={<Error />}>
        <Route index element={<Landing />} errorElement={<Error />} />
      </Route>
      {/* blogs routes */}
      <Route path="/blogs" element={<Layout isHome={false} />} errorElement={<Error />}>
        {/* single blog  route */}
        <Route index element={<Blogs />} errorElement={<Error />} />
        <Route path=":id" element={<SingleBlogPage B errorElement={<Error />} />} />
      </Route>
      <Route path="/login" element={<Login />} errorElement={<Error />} />
      <Route element={<AdminRoutes />} errorElement={<Error />}>
        <Route path="/panel" element={<Panel />} errorElement={<Error />} />
        <Route path="/admins" element={<Admins />} errorElement={<Error />} />
      </Route>
      {/* page 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
