import { HoverEffect } from "@/components/ui/card-hover-effect";
import { projects } from "@/data/data";
export default function Projects() {
  return (
    <>
      <h1 className="text-white-500 font-bold">
        Portfolio <span className="text-primary-500">Showcase</span>
      </h1>
      <div className="max-w-20xl mx-auto">
        <HoverEffect items={projects} />
      </div>
    </>
  );
}
