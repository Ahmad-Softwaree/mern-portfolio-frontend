import ServiceCard from "@/components/card/ServiceCard";
import { services } from "@/constants";

export default function Services() {
  return (
    <>
      <h1 className="serviceHeader font-bold text-white-500">Services</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-10 items-stretch">
        <ServiceCard
          icon={`code`}
          header={services.one.title}
          body={services.one.body}
        />
        <ServiceCard
          icon={`computer`}
          header={services.two.title}
          body={services.two.body}
        />
        <ServiceCard
          icon={`chalkboard-user`}
          header={services.three.title}
          body={services.three.body}
        />
        <ServiceCard
          icon={`server`}
          header={services.four.title}
          body={services.four.body}
        />
        <ServiceCard
          icon={`map`}
          header={services.five.title}
          body={services.five.body}
        />{" "}
        <ServiceCard
          icon={`database`}
          header={services.six.title}
          body={services.six.body}
        />
      </div>
    </>
  );
}
