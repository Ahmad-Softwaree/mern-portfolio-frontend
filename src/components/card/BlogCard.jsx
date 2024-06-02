import { Link, useLocation } from "react-router-dom";
const BlogCard = ({ val }) => {
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((val) => val !== "");

  return (
    <Link
      to={`/blogs/${val._id}`}
      className={`w-full col-span-full md:col-span-6 lg:col-span-4 relative flex flex-col justify-between items-start  gap-2  overflow-hidden  h-full  shadow-xl bg-black-500 p-4   rounded-md  text-center text-white ${
        path.length === 0 && "max-w-[350px]"
      }`}
    >
      <div className="w-full flex flex-col justify-left items-start gap-2">
        <div className="relative w-full rounded-md h-[250px]">
          <img
            className="rounded-md object-cover w-full h-full"
            src={`${val.image}`}
            alt="blogImage"
          />
        </div>
        <div className="w-full flex flex-row justify-start items-center gap-3 mt-2">
          <img
            className="w-[25px] h-[25px] object-cover rounded-full"
            src={val.user.image}
            alt="userImage"
          />
          <span className="text-white-500 text-text1-light">
            {val.user.name}
          </span>
        </div>

        <h2
          className={`text-body2-bold md:text-body1-bold !font-[700] text-left mb-3`}
        >
          {val.title}
        </h2>
      </div>
      <div className="w-full flex flex-row justify-left items-center gap-1.5">
        <span className="opacity-70 cursor-pointer transition-all duration-200 hover:opacity-100 text-white-500">
          {val.categories[0]}
        </span>
        <span className="pb-1">.</span>
        <span className="opacity-70 cursor-pointer transition-all duration-200 hover:opacity-100 text-white-500">
          {convertTimeStampToMomentMonth(val.date)}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
