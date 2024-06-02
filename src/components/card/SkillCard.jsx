export default function SkillCard({ val }) {
  return (
    <div className="w-fit max-w-fit rounded-md cursor-pointer p-1 transition-all flex  flex-row justify-left  items-center gap-2 border-black-600  duration-300 bg-black-600 shadow-xl hover:border-primary-500 flex-auto border-2 border-solid  ">
      <img
        className="w-[25px] object-contain"
        src={val.image}
        alt="skillImage"
      />
      <span className="w-fit text-center text-white-500  text-text2-light">
        {val.name}
      </span>
    </div>
  );
}
