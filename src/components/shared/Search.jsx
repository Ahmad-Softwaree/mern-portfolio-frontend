import { ENUMs } from "@/lib/enum";
import { useSearchParams } from "react-router-dom";

export default function Search({ refetch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let input = searchParams.get(ENUMs.SEARCH_PARAM);

  return (
    <div
      className={`flex flex-row gap-1 justify-between items-center w-full max-w-[400px] border border-solid rounded-lg bg-transparent px-2  relative ${
        input !== "" ? "border-black" : "border-placeholder"
      }`}>
      <input
        className={`p-3 w-[400px] placeholder:text-left text-[14px]  bg-transparent text-left`}
        placeholder={`search`}
        value={input || ""}
        onChange={(e) => {
          setSearchParams((prev) => {
            prev.delete(ENUMs.CATEGORY_PARAM);
            prev.delete(ENUMs.FILTER_PARAM);

            prev.set(ENUMs.SEARCH_PARAM, e.target.value);
            return prev;
          });
        }}
        type="text"
        name="global_search"
        id="global_search"
      />
      {input !== "" && input && (
        <span
          onClick={() => {
            setSearchParams((prev) => {
              prev.delete(ENUMs.SEARCH_PARAM);
              return prev;
            });
          }}
          className="p-2 cursor-pointer rounded-lg py-1 text-white-500">
          <i className="fa-solid fa-x"></i>
        </span>
      )}
    </div>
  );
}
