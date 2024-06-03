import useScrollTop from "@/hooks/useScrollTop";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import useReactScroll from "@/hooks/useReactScroll";

const Layout = () => {
  useScrollTop();
  useReactScroll();

  return (
    <main className="w-full overflow-hidden min-h-screen bg-niceBlack max-w-none lg:max-w-[1600px]  lg:flex lg:flex-row lg:justify-center lg:items-center lg:mx-auto border-x-2 border border-solid border-white-500/[0.2]">
      <div>
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
