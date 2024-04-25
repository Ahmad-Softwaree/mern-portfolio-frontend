import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { Error, NotFound } from "../pages";
import {
  RootRouterProvider,
  UserNullRouterProvider,
  UserRouterProvider,
} from "../providers";
import { Layout, SignInLayout } from "../pages/_root/layout";
import { Login, PrivacyPolicy } from "../pages/_root";
import { Layout as AdminLayout } from "../pages/_user/layout";
import {
  Users,
  Dashboard,
  Configs,
  Projects,
  Subscribers,
  Blogs,
  Skills,
  Works,
  Certificates,
} from "../pages/_user";
import {
  Home,
  Blogs as RootBlogs,
  Projects as RootProjects,
  Certificates as RootCertificates,
} from "@/pages/_root";
import Blog from "@/pages/_root/Blog";
import Project from "@/pages/_root/Project";
import Certificate from "@/pages/_root/Certificate";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Routes */}

      <>
        <Route
          path="/"
          errorElement={<Error />}
          element={<UserNullRouterProvider component={SignInLayout} />}>
          <Route path="login" errorElement={<Error />} element={<Login />} />
        </Route>
      </>
      {/* Normal Routes */}

      <>
        <Route
          path="/"
          errorElement={<Error />}
          element={<RootRouterProvider component={Layout} />}>
          <Route index errorElement={<Error />} element={<Home />} />
          <Route
            path="blogs"
            errorElement={<Error />}
            element={<RootBlogs />}
          />
          <Route path="blogs/:id" errorElement={<Error />} element={<Blog />} />
          <Route
            path="projects"
            errorElement={<Error />}
            element={<RootProjects />}
          />
          <Route
            path="certificates"
            errorElement={<Error />}
            element={<RootCertificates />}
          />
          <Route
            path="projects/:id"
            errorElement={<Error />}
            element={<Project />}
          />
          <Route
            path="certificates/:id"
            errorElement={<Error />}
            element={<Certificate />}
          />
          <Route
            path="privacy_policy"
            errorElement={<Error />}
            element={<PrivacyPolicy />}
          />
        </Route>
      </>
      {/* Admin Routes */}

      <>
        <Route
          path="/dashboard"
          errorElement={<Error />}
          element={<UserRouterProvider component={AdminLayout} />}>
          <Route
            index
            errorElement={<Error />}
            element={<Navigate to={`/dashboard/home`} />}
          />
          <Route path="home" errorElement={<Error />} element={<Dashboard />} />
          <Route path="blogs" errorElement={<Error />} element={<Blogs />} />
          <Route path="skills" errorElement={<Error />} element={<Skills />} />
          <Route path="works" errorElement={<Error />} element={<Works />} />
          <Route
            path="certificates"
            errorElement={<Error />}
            element={<Certificates />}
          />
          <Route
            path="configs"
            errorElement={<Error />}
            element={<Configs />}
          />
          <Route path="users" errorElement={<Error />} element={<Users />} />
          <Route
            path="subscribers"
            errorElement={<Error />}
            element={<Subscribers />}
          />
          <Route
            path="projects"
            errorElement={<Error />}
            element={<Projects />}
          />
        </Route>
      </>
      <Route path="*" errorElement={<Error />} element={<NotFound />} />
    </>
  )
);
export default routes;
