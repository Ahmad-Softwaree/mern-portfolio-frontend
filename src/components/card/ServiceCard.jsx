import { Meteors } from "../ui/meteors";

export default function ServiceCard({ val }) {
  return (
    <div className="w-full min-w-[250px] relative max-w-xs ">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-start items-start">
        <h1 className="font-bold text-xl text-white-500 mb-4 relative z-50 w-full flex flex-row  gap-2 justify-start items-center">
          {val.title} {"   "} {val.icon}
        </h1>

        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          {val.body}
        </p>

        {/* Meaty part - Meteor effect */}
        <Meteors number={20} />
      </div>
    </div>
  );
}
