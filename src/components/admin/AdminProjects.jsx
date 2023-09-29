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
import { ProjectContext } from "../../context/ProjectContext";
import TableSkeleton from "../loading/TableSkeleton";
import NoData from "../global/NoData";
import RefreshData from "../global/RefreshData";
import { UiContext } from "../../context/UiContext";
import { ADD_PROJECT } from "../../context/types/ui_types";
import { getAllProjects } from "../../context/actions/projectAction";
import AdminProject from "./AdminProject";
export default function AdminProjects() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const {
    dispatch: projectDispatch,
    state: { projects, getProjectsLoading },
  } = useContext(ProjectContext);

  useEffect(() => {
    getAllProjects(projectDispatch, alertDispatch);
  }, [projectDispatch]);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="-300"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
    >
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
        <div className="flex flex-row justify-end items-center gap-5">
          <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">
            Project
          </h1>
          <RefreshData
            setter={() => getAllProjects(projectDispatch, alertDispatch)}
          />
        </div>
        <button
          onClick={() =>
            uiDispatch({
              type: ADD_PROJECT,
            })
          }
          className="p-1 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:text-white hover:bg-purple flex flex-row justify-center items-center gap-3"
        >
          <i className="fa-brands fa-plus"></i>
          <span className="!text-[14px]">Add New</span>
        </button>
      </div>

      {getProjectsLoading ? (
        <TableSkeleton cards={4} />
      ) : projects.length > 0 ? (
        <TableContainer className="w-full min-w-[500px]  overflow-auto text-white">
          <Table variant="striped" colorScheme="black" maxHeight={500}>
            <TableCaption color={`white`}>Projects</TableCaption>
            <Thead>
              <Tr borderRadius={`10px`}>
                <Th color={`white`} className="text-white">
                  Id
                </Th>
                <Th color={`white`} className="text-white">
                  Title
                </Th>
                <Th color={`white`} className="text-white">
                  Type
                </Th>
                <Th color={`white`} className="text-white">
                  Image
                </Th>
                <Th color={`white`} className="text-white">
                  Date
                </Th>
                <Th color={`white`} className="text-white">
                  Stack
                </Th>
                <Th color={`white`} className="text-white">
                  Operation
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((val, index) => {
                return <AdminProject key={index} index={index + 1} val={val} />;
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
