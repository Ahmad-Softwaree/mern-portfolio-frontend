import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./error/NotFound";
import Error from "./error/Error.jsx";
import Layout from "./components/layout/Layout.jsx";
import Universal from "./components/Universal.jsx";
import { lazy, Suspense, useEffect } from "react";
import Fallback from "./pages/Fallback";
import "aos/dist/aos.css";
import AOS from "aos";
import NormalRoute from "./routes/NormalRoute";
import AdminPublicRoute from "./routes/AdminPublicRoute";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./components/layout/AdminLayout";

const Landing = lazy(() => import("./pages/landing/Landing.jsx"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectsByTypePage = lazy(() => import("./pages/ProjectsByTypePage"));
const ProjectsByStackPage = lazy(() => import("./pages/ProjectsByStackPage"));

const OneBlog = lazy(() => import("./pages/OneBlog"));
const OneProject = lazy(() => import("./pages/projects/OneProject"));

const OneCertificate = lazy(() =>
  import("./pages/certificates/OneCertificate")
);

// const UpdateBlog = lazy(() => import("./pages/admin/UpdateBlog.jsx"));
const AddBlog = lazy(() => import("./pages/admin/AddBlog.jsx"));
const Panel = lazy(() => import("./pages/admin/Panel"));
const Login = lazy(() => import("./pages/Login"));

const Admins = lazy(() => import("./pages/admin/Admins"));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Universal />} errorElement={<Error />}>
      {/* home route */}
      <Route
        path="/"
        element={<Layout isHome={true} />}
        errorElement={<Error />}
      >
        <Route
          index
          element={<NormalRoute Component={Landing} />}
          errorElement={<Error />}
        />
      </Route>
      {/* blogs routes */}
      <Route
        path="/blogs"
        element={<Layout isHome={false} />}
        errorElement={<Error />}
      >
        <Route
          index
          element={<NormalRoute Component={BlogsPage} />}
          errorElement={<Error />}
        />

        <Route
          path=":blog_id"
          element={<NormalRoute Component={OneBlog} />}
          errorElement={<Error />}
        />
      </Route>
      <Route
        path="/projects"
        element={<Layout isHome={false} />}
        errorElement={<Error />}
      >
        <Route
          index
          element={<NormalRoute Component={ProjectsPage} />}
          errorElement={<Error />}
        />
        <Route
          path="stack/:stack_id"
          element={<NormalRoute Component={ProjectsByStackPage} />}
          errorElement={<Error />}
        />
        <Route
          path="type/:type_id"
          element={<NormalRoute Component={ProjectsByTypePage} />}
          errorElement={<Error />}
        />
        <Route
          path=":project_id"
          element={<NormalRoute Component={OneProject} />}
          errorElement={<Error />}
        />
      </Route>

      <Route
        path="/certificates"
        element={<Layout isHome={false} />}
        errorElement={<Error />}
      >
        <Route
          path=":certificate_id"
          element={<NormalRoute Component={OneCertificate} />}
          errorElement={<Error />}
        />
      </Route>
      <Route
        path="/login"
        element={<AdminPublicRoute Component={Login} />}
        errorElement={<Error />}
      />
      <Route element={<AdminLayout />} errorElement={<Error />}>
        <Route
          path="/panel"
          element={<AdminRoutes Component={Panel} />}
          errorElement={<Error />}
        />
        <Route
          path="/admins"
          element={<AdminRoutes Component={Admins} />}
          errorElement={<Error />}
        />
      </Route>

      <Route element={<AdminLayout layout={false} />} errorElement={<Error />}>
        <Route
          path="/panel/create_blog"
          element={<AdminRoutes Component={AddBlog} />}
          errorElement={<Error />}
        />
        {/* <Route
          path="/panel/update_blog/:blog_id"
          element={<UpdateBlog />}
          errorElement={<Error />}
        /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
