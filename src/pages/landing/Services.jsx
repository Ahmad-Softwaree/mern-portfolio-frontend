import React, { useContext } from "react";
import { Element } from "react-scroll";
import { LanguageContext } from "../../context/LanguageContext";
import ServiceCard from "../../components/services/ServiceCard";

export default function Services() {
  const {
    state: { language, file },
  } = useContext(LanguageContext);

  return (
    <Element
      data-aos="fade-up"
      className="w-full z-[100] bg-lightBlack"
      name="services"
    >
      <section
        id="services"
        className="w-full flex flex-col justify-left items-center gap-10 bg-black text-white px-10 "
      >
        <h1 className="serviceHeader font-bold text-white">
          {file.services.header}
        </h1>

        <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap">
          <ServiceCard
            icon={`code`}
            header={file.services.one.title}
            body={file.services.one.body}
          />
          <ServiceCard
            icon={`computer`}
            header={file.services.two.title}
            body={file.services.two.body}
          />
          <ServiceCard
            icon={`chalkboard-user`}
            header={file.services.three.title}
            body={file.services.three.body}
          />
          <ServiceCard
            icon={`server`}
            header={file.services.four.title}
            body={file.services.four.body}
          />
          <ServiceCard
            icon={`map`}
            header={file.services.five.title}
            body={file.services.five.body}
          />{" "}
          <ServiceCard
            icon={`database`}
            header={file.services.six.title}
            body={file.services.six.body}
          />
        </div>
      </section>
    </Element>
  );
}
