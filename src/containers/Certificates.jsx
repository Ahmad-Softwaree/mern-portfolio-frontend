import { CertificateCard } from "@/components/card";
import { certificates } from "@/data/data";
export default function Certificates() {
  return (
    <>
      <h1 className="text-white-500 font-bold">
        Certified <span className="text-primary-500">Expertise</span>
      </h1>

      <div className="grid grid-cols-2 gap-10 w-full">
        {certificates.map((val, index) => {
          return <CertificateCard key={index} val={val} index={index} />;
        })}
      </div>
    </>
  );
}
