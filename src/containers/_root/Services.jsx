import ServiceCard from "@/components/card/ServiceCard";
import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

export default function Services() {
  const {
    state: { file },
  } = useContext(LanguageContext);

  return (
    <>
      <h1 className="serviceHeader font-bold text-white-500">
        {file.services.header}
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-10 items-stretch">
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
    </>
  );
}
