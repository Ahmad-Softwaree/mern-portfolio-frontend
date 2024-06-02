import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { works } from "@/data/data";

export default function Works() {
  return (
    <div
      className={`flex flex-row justify-center items-center gap-10 flex-wrap`}
    >
      <div className="w-full h-[8vh] md:h-[8rem] gap-10 rounded-md flex flex-col antialiased items-center relative overflow-hidden">
        <InfiniteMovingCards direction="right" speed="fast" items={works} />
      </div>
    </div>
  );
}
