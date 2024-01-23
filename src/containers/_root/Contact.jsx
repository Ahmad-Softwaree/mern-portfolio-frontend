import ContactCard from "@/components/card/ContactCard";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

export default function Contact() {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  return (
    <>
      <h1 className="font-bold text-white-500 w-full text-center">
        {file.nav.contact}
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <div className="p-10 bg-black-500 rounded-md flex flex-col justify-left items-start gap-[10px] col-span-full lg:col-span-1">
          <div className="flex flex-row justify-left items-center gap-5">
            <span className="text-white-500 !text-[18px]">
              <i className="fa-solid fa-phone"></i>
            </span>
            <span className="text-white-500 !text-[18px]">
              +964&nbsp;750-116-71-53
            </span>
          </div>

          <div className="flex flex-row justify-left items-center gap-5">
            <span className="text-white-500 !text-[18px]">
              <i className="fa-solid fa-envelope"></i>{" "}
            </span>
            <a
              className="text-white-500 !text-[18px] transition-all duration-300 hover:text-primary-500"
              target="_blank"
              title="Email to ahmad Software"
              href="mailto:dr.ahmad.salah.54@gmail.com">
              dr.ahmad.salah.54@gmail.com
            </a>
          </div>
        </div>

        <ContactCard />
      </div>
    </>
  );
}
