import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function Blog() {
  return (
    <section className="!p-0 !pt-10 relative w-full min-h-screen text-white-500 grid grid-cols-1">
      {isLoading ? (
        <Loader size="xl" screen={true} />
      ) : (
        <div className="!py-20 md:mx-20 lg:mx-50 px-10 bg-black-600 col-span-full h-full">
          <div className="flex flex-col justify-start items-start gap-10 z-50">
            <img
              className="w-full h-[400px] object-cover"
              src={`${data.image}`}
              alt="Blog Image"
            />
            <h1 className="text-heading3-bold md:text-heading2-bold lg:text-heading2-bold text-white-500 text-left !font-[700]">
              {data.title}
            </h1>
            <div className="w-full flex flex-row justify-left items-center gap-3">
              <img
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={`${data.user.image}`}
                alt="Blog Image"
              />
              <div className="flex flex-col justify-center items-start">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="text-text1-semibold ">Ahmad Software</p>
                  <span className="pb-1">.</span>
                  <p className="text-text2-semibold ">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-end items-center gap-5 w-full my-10">
            <div className={`w-full`}>{parse(data.body)}</div>

            <div
              className={`w-full flex flex-row items-center gap-5 mt-20 ${
                lang === "en" ? "justify-left" : "justify-right"
              }`}
            >
              {data.categories?.map((category, index) => {
                return (
                  <Link
                    to={`/blogs?category=${category._id}`}
                    key={index}
                    className={`text-white-500 opacity-70 border-black-300 border-solid border-2 p-2 rounded-[20px] hover:bg-black-300 hover:opacity-100 transition-all duration-200   px-4 cursor-pointer`}
                  >
                    {category.enName}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
