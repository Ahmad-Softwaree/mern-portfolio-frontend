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
        <h1 className="font-bold text-white">Services</h1>

        <div className="w-full flex flex-row justify-center items-center gap-10 flex-wrap">
          <ServiceCard
            icon={`code`}
            header={`Web Developing`}
            body={`Developing website with newest technologies, clean code and configuration`}
          />
          <ServiceCard
            icon={`computer`}
            header={`System Developing`}
            body={`Developing Systems with newest technologies, clean code and configuration`}
          />
          <ServiceCard
            icon={`chalkboard-user`}
            header={`Online Teaching`}
            body={`Teaching Fields online with good plan, I can bring attention of everyone`}
          />
          <ServiceCard
            icon={`server`}
            header={`Server Management`}
            body={`Managing Servers and Maintain Them, Switching and Protecting
            Server and Hosts`}
          />
          <ServiceCard
            icon={`map`}
            header={`API Integration`}
            body={` Building Secure and most high performance API as much as It could
            be`}
          />{" "}
          <ServiceCard
            icon={`database`}
            header={`Database`}
            body={` Build and Join Tables and Data, With SQL and NoSql databases`}
          />
        </div>
      </section>
    </Element>
  );
}
