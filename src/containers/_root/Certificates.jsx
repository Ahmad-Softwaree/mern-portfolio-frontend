import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetCertificates } from "@/lib/react-query/query/certificate.query";
import { Fragment, useContext } from "react";

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
      ) : data?.pages?.some((arr) => arr.length > 0) ? (
        <>
          <>
            {data.pages.map((row, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col justify-left items-start gap-10">
                  {row.map((certificate, index) => {
                    return (
                      <CertificateCard
                        key={index}
                        val={certificate}
                        index={index}
                      />
                    );
                  })}
                </div>
              );
            })}
          </>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}
