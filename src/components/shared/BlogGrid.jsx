import { ENUMs } from "@/lib/enum";
import { BlogCard } from "../card";

const BlogGrid = ({ row, page }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10">
      {row.map((val, index) => {
        return (
          <BlogCard
            key={index}
            index={index + page * ENUMs.PAGINATION}
            val={val}
          />
        );
      })}
    </div>
  );
};

export default BlogGrid;
