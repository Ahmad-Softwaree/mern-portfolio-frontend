import { Type } from "@/components/shared";
import { useParams } from "react-router-dom";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { projects } from "@/data/data";
import { FaExternalLinkAlt } from "react-icons/fa";
export default function Project() {
  const { id } = useParams();
  const data = projects.find((val) => val.id == id);
  return (
    <section className="element min-h-screen !w-full">
      <div className="flex flex-col justify-left items-start gap-[30px] w-full">
        <img
          className="w-full h-[340px] md:h-[450px] rounded-md object-contain border-2 border-solid border-niceBlack"
          src={`${data?.image}`}
          alt="Project Image"
        />

        <div className="flex flex-col justify-left items-center gap-1 w-full">
          <div
            className={`w-full flex flex-row justify-start items-center gap-2`}
          >
            <h1 className="text-white-500 text-body2-semibold md:text-sub-heading2-semibold lg:text-sub-heading1-semibold font-bold  mb-5">
              {data?.title} {"   "}
            </h1>{" "}
            {data?.url && (
              <a target="_blank" href={data.url}>
                <FaExternalLinkAlt className="text-sm md:text-xl ml-2" />{" "}
              </a>
            )}
          </div>

          <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
            {data?.desc}
          </h2>
          <p
            className={
              "my-8 w-full text-zinc-400 tracking-wide leading-relaxed text-sm"
            }
          >
            Contributor: {data?.contributor || "My Self"}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row justify-left items-center gap-5 flex-wrap">
        {data?.types.map((val, index) => {
          return <Type val={val} key={index} />;
        })}
      </div>

      {data?.gits.length > 0 && (
        <div className="ml-4 flex flex-row gap-4 w-full">
          <AnimatedTooltip git={true} items={data?.gits} />
        </div>
      )}
      {data.links.length > 0 && (
        <div className="ml-4 flex flex-row gap-4 w-full">
          <AnimatedTooltip link={true} items={data.links} />
        </div>
      )}
      <div className="flex flex-row items-center justify-start mb-10 w-full">
        <AnimatedTooltip items={data?.stacks} />
      </div>
    </section>
  );
}
