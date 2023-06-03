import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Fallback from "./components/Fallback.jsx";
const UpdateBlog = lazy(() => import("./pages/admin/UpdateBlog.jsx"));
const CreateBlog = lazy(() => import("./pages/admin/CreateBlog.jsx"));
const Landing = lazy(() => import("./pages/landing/Landing.jsx"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Blogs = lazy(() => import("./pages/blogs/Blogs"));
const ErrorPage = lazy(() => import("./error/ErrorPage"));
const Error = lazy(() => import("./error/Error"));
const SingleBlogPage = lazy(() => import("./pages/singleBlog/SingleBlogPage"));
const Universal = lazy(() => import("./components/Universal"));
const Panel = lazy(() => import("./pages/panel/Panel"));
const Login = lazy(() => import("./pages/Login"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const Admins = lazy(() => import("./pages/admin/Admins"));
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
        <Route path=":id" element={<SingleBlogPage errorElement={<Error />} />} />
      </Route>
      <Route path="/login" element={<Login />} errorElement={<Error />} />
      <Route element={<AdminRoutes layout={true} />} errorElement={<Error />}>
        <Route path="/panel" element={<Panel />} errorElement={<Error />} />
        <Route path="/admins" element={<Admins />} errorElement={<Error />} />
      </Route>
      <Route element={<AdminRoutes layout={false} />} errorElement={<Error />}>
        <Route path="/panel/create_blog" element={<CreateBlog />} errorElement={<Error />} />
        <Route path="/panel/update_blog/:blog_id" element={<UpdateBlog />} errorElement={<Error />} />
      </Route>

      {/* page 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
