import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tfoot,
  Tr,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";

export default function TableSkeleton({ cards }) {
  return (
    <TableContainer className="w-full min-w-[500px] overflow-scroll">
      <Table variant="striped" colorScheme="blue">
        <TableCaption>
          <Skeleton className="h-[20px]" />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array(cards)
            .fill(0)
            .map((val, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                  <Td>
                    <Skeleton className="h-[20px]" />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
            <Th>
              <Skeleton className="h-[20px]" />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
