export default function SkillCard({ val }) {
  return (
    <div className="w-fit max-w-fit rounded-md cursor-pointer p-1 px-2 transition-all flex  flex-row justify-left  items-center gap-2 border-white-500/[0.2]  duration-300 bg-black-600 shadow-xl  flex-auto border-2 border-solid">
      <img
        className="w-[25px] object-cover rounded-full"
        src={val.image}
        alt="skillImage"
      />
      <span className="w-fit text-center text-white-500  text-text2-light">
        {val.name}
      </span>
    </div>
  );
}
