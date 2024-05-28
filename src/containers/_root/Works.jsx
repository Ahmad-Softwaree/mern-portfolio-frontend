import { Loader, NoData } from "@/components/shared";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useGetWorks } from "@/lib/react-query/query/work.query";

export default function Works() {
  const { data, isLoading } = useGetWorks();

  return (
    <div
      className={`flex flex-row justify-center items-center gap-10 flex-wrap`}
    >
      {isLoading ? (
        <Loader size="xl" />
      ) : data.length > 0 ? (
        <div className="w-full h-[8vh] md:h-[8rem] gap-10 rounded-md flex flex-col antialiased items-center relative overflow-hidden">
          <InfiniteMovingCards direction="right" speed="fast" items={data} />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
