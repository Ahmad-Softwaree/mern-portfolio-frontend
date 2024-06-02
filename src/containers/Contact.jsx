export default function Contact() {
  return (
    <>
      <h1 className="font-bold text-white-500 w-full text-center">Contact</h1>
      <div className="w-full grid grid-cols-full gap-10 my-10">
        <div className="p-10 bg-black-500 rounded-md flex flex-col justify-left items-start gap-[10px] col-span-full lg:col-span-1">
          <div className="flex flex-row justify-left items-center gap-5">
            <span className="text-white-500 !text-[18px]">
              <i className="fa-solid fa-phone"></i>
            </span>
            <span className="text-white-500 !text-[18px]">
              +964&nbsp;770-199-30-85
            </span>
          </div>

          <div className="flex flex-row justify-left items-center gap-5">
            <span className="text-white-500 !text-[18px]">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <a
              className="text-white-500 !text-[18px] transition-all duration-300 hover:text-primary-500"
              target="_blank"
              title="Email to ahmad Software"
              href="mailto:dr.ahmad.salah.54@gmail.com"
            >
              dr.ahmad.salah.54@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
