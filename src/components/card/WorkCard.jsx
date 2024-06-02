export default function WorkCard({ val }) {
  return (
    <div className={`flex flex-row justify-center items-center gap-2`}>
      <img
        className={`w-10 lg:w-20 h-10 lg:h-20 object-contain`}
        src={val.image}
        alt={val.image}
      />
      <p className="text-text1-semibold lg:text-body2-semibold">
        {val.company}
      </p>
    </div>
  );
}
