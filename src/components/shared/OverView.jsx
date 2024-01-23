import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { getStorageUsage } from "../../context/actions/adminAction";
import { AlertContext } from "../../context/AlertContext";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
export default function OverView() {
  const {
    dispatch: adminDispatch,
    state: { admin, loading, storageSize, storageSizeLoading },
  } = useContext(AdminContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  useEffect(() => {
    getStorageUsage(adminDispatch, alertDispatch);
  }, [adminDispatch]);
  return (
    <div
      data-aos="fade-right"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black-500 p-5 rounded-lg shadow-xl">
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white-500 ">
        <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">
          Over View
        </h1>
        <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">
          {admin?.name}
        </h1>
      </div>

      {!storageSizeLoading && (
        <Stat gap={`15px`}>
          <StatLabel className="text-white-500 !text-[20px]">
            Firebase Storage Usage
          </StatLabel>
          <StatNumber className="text-white-500 !text-[20px]">
            {storageSize} MB
          </StatNumber>
          <StatHelpText className="text-white-500 !text-[20px]">
            <StatArrow type="increase" />
            Usage
          </StatHelpText>
        </Stat>
      )}
    </div>
  );
}
