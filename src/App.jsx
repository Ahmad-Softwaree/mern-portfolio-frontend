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
import { Suspense, useEffect } from "react";
import Fallback from "./pages/Fallback";
import "aos/dist/aos.css";
import AOS from "aos";
import NormalRoute from "./routes/NormalRoute";
import AdminPublicRoute from "./routes/AdminPublicRoute";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./components/layout/AdminLayout";
import Landing from "./pages/landing/Landing.jsx";
import BlogsPage from "./pages/BlogsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectsByTypePage from "./pages/ProjectsByTypePage";
import ProjectsByStackPage from "./pages/ProjectsByStackPage";
import OneBlog from "./pages/OneBlog";
import OneProject from "./pages/projects/OneProject";
import OneCertificate from "./pages/certificates/OneCertificate";
import AddBlog from "./pages/admin/AddBlog.jsx";
import Panel from "./pages/admin/Panel";
import Login from "./pages/Login";
import Admins from "./pages/admin/Admins";
import UpdateBlog from "./pages/admin/UpdateBlog";

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
        <Route
          path="/panel/update_blog/:blog_id"
          element={<AdminRoutes Component={UpdateBlog} />}
          errorElement={<Error />}
        />
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
