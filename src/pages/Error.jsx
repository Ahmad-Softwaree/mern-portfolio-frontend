import { Link, useRouteError } from "react-router-dom";
export default function Error() {
  const error = useRouteError();

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 min-h-screen">
      <div className="flex flex-col justify-start items-center text-right gap-5">
        <h1 className="text-primary-500">ببورە!</h1>
        <p className="text-white-500 w-full text-center ">{error.message}</p>
        <Link
          to={`/`}
          className="bg-primary-500 text-white-500 rounded-lg cursor-pointer flex flex-row justify-center items-center gap-3 p-3">
          <span>
            <i className="fa-solid fa-home"></i>
          </span>
          <span>Home Page</span>
        </Link>
      </div>
    </div>
  );
}
