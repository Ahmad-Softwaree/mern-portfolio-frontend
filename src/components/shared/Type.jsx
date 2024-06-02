export default function Type({ val }) {
  return (
    <span className="p-1 px-2 border-[3px] hover:bg-black-600 border-solid border-gray-600 transition-all duration-300 w-fit  text-white-500  text-caption1-light  md:text-text1-light  rounded-md bg-transparent  cursor-pointer ">
      {val.name}
    </span>
  );
}
