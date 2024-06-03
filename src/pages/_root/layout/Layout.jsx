import useScrollTop from "@/hooks/useScrollTop";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import useReactScroll from "@/hooks/useReactScroll";

const Layout = () => {
  useScrollTop();
  useReactScroll();

  return (
    <main className="w-full overflow-hidden min-h-screen bg-niceBlack">
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
