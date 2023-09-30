import React, { useContext, useEffect } from "react";
import { SubscribeContext } from "../../context/SubscribeContext";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableSkeleton from "../../components/loading/TableSkeleton";
import { AlertContext } from "../../context/AlertContext";
import { getAllSubscribes } from "../../context/actions/subscribeAction";
import SubscribeCard from "../../components/admin/SubscribeCard";
import NoData from "../../components/global/NoData";

export default function Subscribes() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: subscribeDispatch,
    state: { subscribes, getSubscribesLoading },
  } = useContext(SubscribeContext);

  useEffect(() => {
    getAllSubscribes(subscribeDispatch, alertDispatch);
  }, [subscribeDispatch]);

  return (
    <section
      data-aos="fade-up"
      className="w-full admin min-h-screen flex flex-col justify-left items-center gap-[50px] overflow-hidden pl-[150px] pr-[50px] pb-[400px] bg-lightBlack"
    >
      <div
        data-aos="fade-left"
        data-aos-offset="-300"
        className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
      >
        <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
          <div className="flex flex-row justify-end items-center gap-5">
            <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">
              Subscribes
            </h1>
          </div>
        </div>

        {getSubscribesLoading ? (
          <TableSkeleton cards={4} />
        ) : subscribes.length > 0 ? (
          <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
            <Table variant="striped" colorScheme="black">
              <TableCaption color={`white`}>Subscribes</TableCaption>
              <Thead>
                <Tr borderRadius={`10px`}>
                  <Th color={`white`} className="text-white">
                    Id
                  </Th>

                  <Th color={`white`} className="text-white">
                    Email
                  </Th>
                  <Th color={`white`} className="text-white">
                    Date
                  </Th>

                  <Th color={`white`} className="text-white">
                    Operation
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscribes.map((val, index) => {
                  return <SubscribeCard val={val} key={index} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
}
