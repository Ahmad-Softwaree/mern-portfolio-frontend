import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/blogs/Blogs";
import Landing from "./pages/landing/Landing";
import SingleBlog from "./pages/singleBlog/SingleBlog";
import ErrorPage from "./error/ErrorPage";
import Error from "./error/Error";
import "./language/i18react.js";
import { useTranslation } from "react-i18next";
import Logout from "./pages/logout/Logout";
import Login from "./pages/login/Login";
import Fallback from "./pages/Fallback";
import ErrorBoundary from "./pages/ErrorBoundary";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* home route */}
      <Route path="/" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={true} />} errorElement={<Error />}>
        <Route index element={<Landing BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
      </Route>

      {/* login and logout */}
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />

      {/* blogs routes */}
      <Route path="/blogs" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={false} />} errorElement={<Error />}>
        {/* single blog  route */}
        <Route index element={<Blogs BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
        <Route path=":id" element={<SingleBlog BACKEND_HOST={BACKEND_HOST} errorElement={<Error />} />} />
      </Route>

      {/* page 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

//Error whole app

const ErrorBoundaryDetect = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return () => {
      if (hasError) {
        logErrorToMyService();
      }
    };
  }, [hasError]);

  if (hasError) {
    return <ErrorBoundary />;
  }

  return children;
};

function App() {
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

  const [show, setShow] = useState(false);
  //this will make the website not load until all the images loaded
  const images = document.querySelectorAll("img");

  let imagesLoaded = 0;
  images.forEach((img) => {
    if (img.complete) {
      imagesLoaded++;
    } else {
      img.addEventListener("load", () => {
        imagesLoaded++;
        if (imagesLoaded + 1 === images.length) {
          loadData().then(() => {
            setShow(true);
          });
        }
      });
    }
  });

  return (
    <ErrorBoundaryDetect>
      <div className="App">{!show ? <Fallback /> : <RouterProvider router={routes} />}</div>
    </ErrorBoundaryDetect>
  );
}

export default App;
