import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetCertificates } from "@/lib/react-query/query/certificate.query";
import { useContext } from "react";

import { CertificateCard } from "@/components/card";
export default function Certificates() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  const { data, isLoading } = useGetCertificates();
  return (
    <>
      <h1 className="text-white-500 font-bold">{file.nav.certificate}</h1>
      {isLoading ? (
        <Loader size="xl" />
      ) : data?.length > 0 ? (
        <>
          <>
            {data.map((val, index) => {
              return <CertificateCard key={index} val={val} index={index} />;
            })}
          </>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}
