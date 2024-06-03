import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { works } from "@/data/data";

export default function Works() {
  return (
    <>
      <h1 className="skillsHeader font-bold text-white-500">
        <span className="text-primary-500">Professional</span> Collaborations
      </h1>

      <div
        className={`flex flex-row justify-center items-center gap-10 flex-wrap`}
      >
        <div className="w-full h-[8vh] md:h-[8rem] gap-10 rounded-md flex flex-col antialiased items-center relative overflow-hidden">
          <InfiniteMovingCards direction="right" speed="fast" items={works} />
        </div>
      </div>
    </>
  );
}
