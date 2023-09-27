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
import AdminBlog from "./AdminBlog";
import { Link } from "react-router-dom";
import { AlertContext } from "../../context/AlertContext";
import { BlogContext } from "../../context/BlogContext";
import { getAllBlogs } from "../../context/actions/blogAction";
import TableSkeleton from "../loading/TableSkeleton";
import NoData from "../global/NoData";
import RefreshData from "../global/RefreshData";
export default function AdminBlogs() {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const {
    dispatch: blogDispatch,
    state: { blogs, getBlogsLoading },
  } = useContext(BlogContext);

  useEffect(() => {
    getAllBlogs(blogDispatch, alertDispatch);
  }, [blogDispatch]);
  return (
    <div
      data-aos="fade-left"
      data-aos-offset="-300"
      className="w-full flex flex-col justify-left items-center gap-10 bg-black p-5 rounded-lg shadow-xl"
    >
      <div className="flex flex-row justify-between items-center w-full gap-5 text-white">
        <div className="flex flex-row justify-end items-center gap-5">
          <h1 className="font-[500] lg:!text-[24px] md:!text-[22px]">Blogs </h1>
          <RefreshData
            setter={() => getAllBlogs(blogDispatch, alertDispatch)}
          />
        </div>
        <Link
          to={`create_blog`}
          className="p-1 px-6 rounded-md border-2 border-solid border-purple text-purple transition-all duration-300 hover:text-white hover:bg-purple flex flex-row justify-center items-center gap-3"
        >
          <i className="fa-brands fa-plus"></i>
          <span className="!text-[14px]">Add New</span>
        </Link>
      </div>

      {getBlogsLoading ? (
        <TableSkeleton cards={8} />
      ) : blogs.length > 0 ? (
        <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
          <Table variant="striped" colorScheme="black">
            <TableCaption color={`white`}>Blogs</TableCaption>
            <Thead>
              <Tr borderRadius={`10px`}>
                <Th color={`white`} className="text-white">
                  Id
                </Th>
                <Th color={`white`} className="text-white">
                  Title
                </Th>
                <Th color={`white`} className="text-white">
                  Image
                </Th>
                <Th color={`white`} className="text-white">
                  Date
                </Th>
                <Th color={`white`} className="text-white">
                  Category
                </Th>
                <Th color={`white`} className="text-white">
                  Operation
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map((val, index) => {
                return <AdminBlog key={index} index={index + 1} val={val} />;
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
