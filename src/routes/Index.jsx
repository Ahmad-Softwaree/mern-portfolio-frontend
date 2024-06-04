import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Error, NotFound } from "../pages";
import { RootRouterProvider } from "../providers";
import { Layout } from "../pages/_root/layout";

import { Home, Project } from "@/pages/_root";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Normal Routes */}

      <>
        <Route
          path="/"
          errorElement={<Error />}
          element={<RootRouterProvider component={Layout} />}
        >
          <Route index errorElement={<Error />} element={<Home />} />
          <Route
            path="projects/:id"
            errorElement={<Error />}
            element={<Project />}
          />
        </Route>
      </>

      <Route path="*" errorElement={<Error />} element={<NotFound />} />
    </>
  )
);
export default routes;
