import Alert from "@/components/shared/Alert";
import useRefreshPage from "@/hooks/useRefreshPage";
import useRefreshStorage from "@/hooks/useRefreshStorage";
import useScrollTop from "@/hooks/useScrollTop";
import { Outlet } from "react-router-dom";
import { Aside, Modals } from ".";

const Layout = () => {
  useScrollTop();
  useRefreshPage();
  useRefreshStorage();
  return (
    <>
      <Alert />
      <Aside />
      <Modals />
      <main className="w-full overflow-hidden min-h-screen bg-black-500">
        <section className="admin bg-black-500 min-h-screen flex flex-row justify-center items-center gap-5">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
