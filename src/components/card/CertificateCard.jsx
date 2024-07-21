import React from "react";

export default function CertificateCard({ val }) {
  return (
    <div className={`relative w-full col-span-1 gap-10`}>
      <img
        alt={val.id}
        src={val.image}
        className={`object-contain origin-center`}
      />
    </div>
  );
}
