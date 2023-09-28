import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import AdminCard from "../../components/admin/AdminCard";
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

export default function Admins() {
  const {
    state: { admin, loading },
  } = useContext(AdminContext);

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
              Admins
            </h1>
          </div>
        </div>

        {loading ? (
          <TableSkeleton cards={8} />
        ) : admin ? (
          <TableContainer className="w-full min-w-[500px] overflow-scroll text-white">
            <Table variant="striped" colorScheme="black">
              <TableCaption color={`white`}>Admins</TableCaption>
              <Thead>
                <Tr borderRadius={`10px`}>
                  <Th color={`white`} className="text-white">
                    Id
                  </Th>
                  <Th color={`white`} className="text-white">
                    Name
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
                <AdminCard val={admin} />
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
