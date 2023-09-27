import React, { useContext } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";
import ContactCard from "../../components/contact/ContactCard";

export default function Contact() {
  const {
    state: { file, language },
  } = useContext(LanguageContext);
  return (
    <Element className="w-full bg-niceBlack" name="contact">
      <section
        data-aos="fade-up"
        id="contact"
        className="flex flex-col justify-center items-center w-full gap-5 px-10"
      >
        <h1 className="font-bold text-white w-full text-center">
          {file.nav.contact}
        </h1>
        <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap my-10">
          <div className="p-10 bg-black rounded-md flex flex-col justify-left items-start gap-[10px] min-w-[350px] md:w-[500px] h-[300px]">
            <div className="flex flex-row justify-left items-center gap-5">
              <span className="text-white !text-[18px]">
                <i className="fa-solid fa-phone"></i>
              </span>
              <span className="text-white !text-[18px]">
                +964&nbsp;750-116-71-53
              </span>
            </div>

            <div className="flex flex-row justify-left items-center gap-5">
              <span className="text-white !text-[18px]">
                <i className="fa-solid fa-envelope"></i>{" "}
              </span>
              <a
                className="text-white !text-[18px] transition-all duration-300 hover:text-purple"
                target="_blank"
                title="Email to ahmad Software"
                href="mailto:dr.ahmad.salah.54@gmail.com"
              >
                dr.ahmad.salah.54@gmail.com
              </a>
            </div>
          </div>

          <ContactCard />
        </div>
      </section>
    </Element>
  );
}
