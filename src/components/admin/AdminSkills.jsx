import React, { useContext, useEffect, useState } from "react";
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
import { SkillContext } from "../../context/SkillContext";
import TableSkeleton from "../loading/TableSkeleton";
import NoData from "../global/NoData";
import RefreshData from "../global/RefreshData";
import { UiContext } from "../../context/UiContext";
import { ADD_SKILL } from "../../context/types/ui_types";
import { getAllSkills } from "../../context/actions/skillAction";
import { Tooltip } from "@chakra-ui/react";
import AdminSkill from "./AdminSkill";
export default function AdminSkills() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const {
    dispatch: skillDispatch,
    state: { skills, getSkillsLoading },
  } = useContext(SkillContext);

  useEffect(() => {
    getAllSkills(skillDispatch, alertDispatch);
  }, [skillDispatch]);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="-300"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
    >
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
        <div className="flex flex-row justify-end items-center gap-5">
          <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">Skills</h1>
          <RefreshData
            setter={() => getAllSkills(skillDispatch, alertDispatch)}
          />
        </div>
        <button
          onClick={() =>
            uiDispatch({
              type: ADD_SKILL,
            })
          }
          className="p-1 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:text-white hover:bg-purple flex flex-row justify-center items-center gap-3"
        >
          <i className="fa-brands fa-plus"></i>
          <span className="!text-[14px]">Add New</span>
        </button>
      </div>

      {getSkillsLoading ? (
        <TableSkeleton cards={4} />
      ) : skills.length > 0 ? (
        <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
          <Table variant="striped" colorScheme="black">
            <TableCaption color={`white`}>Skills</TableCaption>
            <Thead>
              <Tr borderRadius={`10px`}>
                <Th
                  color={`white`}
                  className="text-white flex flex-row justify-left items-center gap-2"
                >
                  <Tooltip label="Sort Skills" aria-label="A tooltip">
                    <span className="!text-[14px] cursor-pointer transition-all duration-300 hover:text-purple">
                      <i className={`fa-solid fa-arrow-up`}></i>
                    </span>
                  </Tooltip>
                  <span className="!text-[14px]">Id</span>
                </Th>
                <Th color={`white`} className="text-white">
                  Name
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
                  Operation
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {skills.map((val, index) => {
                return <AdminSkill key={index} index={index + 1} val={val} />;
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
