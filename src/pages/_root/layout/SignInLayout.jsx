import Alert from "@/components/shared/Alert";
import useRefreshPage from "@/hooks/useRefreshPage";
import useRefreshStorage from "@/hooks/useRefreshStorage";
import useScrollTop from "@/hooks/useScrollTop";
import { Outlet } from "react-router-dom";

const SignInLayout = () => {
  useScrollTop();
  useRefreshPage();
  useRefreshStorage();
  return (
    <>
      <Alert />
      <main className="w-full overflow-hidden min-h-screen bg-white-500">
        <section className="min-h-screen bg-black-500 flex flex-row justify-center items-center gap-5">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default SignInLayout;
