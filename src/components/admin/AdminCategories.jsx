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
import { CategoryContext } from "../../context/CategoryContext";
import TableSkeleton from "../loading/TableSkeleton";
import NoData from "../global/NoData";
import RefreshData from "../global/RefreshData";
import { getAllCategories } from "../../context/actions/categoryAction";
import AdminCategory from "./AdminCategory";
import { UiContext } from "../../context/UiContext";
import { ADD_CATEGORY } from "../../context/types/ui_types";
export default function AdminCategories() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  const {
    dispatch: categoryDispatch,
    state: { categories, getCategoriesLoading },
  } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories(categoryDispatch, alertDispatch);
  }, [categoryDispatch]);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="-300"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
    >
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
        <div className="flex flex-row justify-end items-center gap-5">
          <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">
            Categories
          </h1>
          <RefreshData
            setter={() => getAllCategories(categoryDispatch, alertDispatch)}
          />
        </div>
        <button
          onClick={() =>
            uiDispatch({
              type: ADD_CATEGORY,
            })
          }
          className="p-1 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:text-white hover:bg-purple flex flex-row justify-center items-center gap-3"
        >
          <i className="fa-brands fa-plus"></i>
          <span className="!text-[14px]">Add New</span>
        </button>
      </div>

      {getCategoriesLoading ? (
        <TableSkeleton cards={4} />
      ) : categories.length > 0 ? (
        <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
          <Table variant="striped" colorScheme="black">
            <TableCaption color={`white`}>Categories</TableCaption>
            <Thead>
              <Tr borderRadius={`10px`}>
                <Th color={`white`} className="text-white">
                  Id
                </Th>
                <Th color={`white`} className="text-white">
                  Name
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
              {categories.map((val, index) => {
                return (
                  <AdminCategory key={index} index={index + 1} val={val} />
                );
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
