import Alert from "@/components/shared/Alert";
import useRefreshPage from "@/hooks/useRefreshPage";
import useScrollTop from "@/hooks/useScrollTop";
import { Outlet } from "react-router-dom";
import { Modals } from ".";
import Header from "./Header";
import Footer from "./Footer";
import useReactScroll from "@/hooks/useReactScroll";
import useAos from "@/hooks/useAos";
import useChangeLanguage from "@/hooks/useChangeLanguage";

const Layout = () => {
  useScrollTop();
  useRefreshPage();
  useAos();
  useReactScroll();
  useChangeLanguage();
  return (
    <>
      <Alert />
      <Modals />
      <main className="w-full overflow-hidden min-h-screen bg-black-500">
        <Header />

        <Outlet />

        <Footer />
      </main>
    </>
  );
};

export default Layout;
