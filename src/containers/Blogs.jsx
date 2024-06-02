import { BlogCard } from "@/components/card";
import { blogs } from "@/data/data";
export default function Blogs() {
  return (
    <>
      <h1 className="text-white-500 font-bold">Blogs</h1>

      <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap">
        {blogs.map((val, index) => {
          return <BlogCard key={index} val={val} index={index} />;
        })}
      </div>
    </>
  );
}
