import ServiceCard from "@/components/card/ServiceCard";
import { FaConnectdevelop, FaServer, FaYoutube } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
export const services = [
  {
    title: "Development",
    body: "Developing (Website, Application, System) with newest technologies, clean code and configuration",
    icon: <FaConnectdevelop />,
  },
  {
    title: "Online teaching",
    body: "Teaching Fields online with good plan, I can bring attention of everyone",
    icon: <FaYoutube />,
  },
  {
    title: "Server management",
    body: "Managing Servers and Maintain Them, Switching and Protecting Server and Hosts",
    icon: <FaServer />,
  },
  {
    title: "API integration",
    body: "Building Secure and most high performance API as much as It could be",
    icon: <TbApi />,
  },
];

export default function Services() {
  return (
    <>
      <h1 className="font-bold text-white-500">
        What I <span className="text-primary-500">Offer</span>
      </h1>

      <div className="w-full flex flex-row justify-center items-stretch gap-10 flex-wrap">
        {services.map((val, index) => {
          return <ServiceCard key={index} val={val} />;
        })}
      </div>
    </>
  );
}
