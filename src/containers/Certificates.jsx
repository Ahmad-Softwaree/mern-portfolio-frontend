import { CertificateCard } from "@/components/card";
import { certificates } from "@/data/data";
export default function Certificates() {
  return (
    <>
      <h1 className="text-white-500 font-bold">Certificates</h1>

      <>
        {certificates.map((val, index) => {
          return <CertificateCard key={index} val={val} index={index} />;
        })}
      </>
    </>
  );
}
