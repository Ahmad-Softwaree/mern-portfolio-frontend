import { Loader, NoData } from "@/components/shared";
import { LanguageContext } from "@/context/LanguageContext";
import { useGetCertificates } from "@/lib/react-query/query/certificate.query";
import { Fragment, useContext } from "react";

import { CertificateCard } from "@/components/card";
import { Link } from "react-router-dom";
export default function Certificates() {
  const {
    state: { file },
  } = useContext(LanguageContext);
  const { data, isLoading, hasNextPage } = useGetCertificates();
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

          <Link
            className="blogsLink p-2 px-6 rounded-lg cursor-pointer text-white-500 bg-transparent border-2 border-primary-500 border-solid transition-all duration-300 hover:bg-primary-500 hover:text-white-500"
            to={`/certificates`}>
            {file.blog.seeMore}
          </Link>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}
