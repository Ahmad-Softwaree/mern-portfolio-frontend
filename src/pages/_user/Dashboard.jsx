import Logo from "@/components/shared/Logo";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-left items-center gap-10">
      <Logo size="xl" />
      <h1 className="text-body1-bold md:text-heading1-bold text-center text-primary-500">
        Dashboard
      </h1>
    </div>
  );
};

export default Dashboard;
