import React, { useContext, useEffect } from "react";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AlertContext } from "../../context/AlertContext";
import { StackContext } from "../../context/StackContext";
import TableSkeleton from "../loading/TableSkeleton";
import NoData from "../global/NoData";
import RefreshData from "../global/RefreshData";
import { UiContext } from "../../context/UiContext";
import { ADD_STACK } from "../../context/types/ui_types";
import { getAllStacks } from "../../context/actions/stackAction";
import AdminStack from "./AdminStack";
export default function AdminStacks() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const {
    dispatch: stackDispatch,
    state: { stacks, getStacksLoading },
  } = useContext(StackContext);

  useEffect(() => {
    getAllStacks(stackDispatch, alertDispatch);
  }, [stackDispatch]);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="-900"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
    >
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
        <div className="flex flex-row justify-end items-center gap-5">
          <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">Stacks</h1>
          <RefreshData
            setter={() => getAllStacks(stackDispatch, alertDispatch)}
          />
        </div>
        <button
          onClick={() =>
            uiDispatch({
              type: ADD_STACK,
            })
          }
          className="p-1 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:text-white hover:bg-purple flex flex-row justify-center items-center gap-3"
        >
          <i className="fa-brands fa-plus"></i>
          <span className="!text-[14px]">Add New</span>
        </button>
      </div>

      {getStacksLoading ? (
        <TableSkeleton cards={8} />
      ) : stacks.length > 0 ? (
        <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
          <Table variant="striped" colorScheme="black">
            <TableCaption color={`white`}>Stacks</TableCaption>
            <Thead>
              <Tr borderRadius={`10px`}>
                <Th color={`white`} className="text-white">
                  Id
                </Th>
                <Th color={`white`} className="text-white">
                  Name
                </Th>
                <Th color={`white`} className="text-white">
                  Color
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
              {stacks.map((val, index) => {
                return <AdminStack key={index} index={index + 1} val={val} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <NoData />
      )}
    </div>
  );
}
