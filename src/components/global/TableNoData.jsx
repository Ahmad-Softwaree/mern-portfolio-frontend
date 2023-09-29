import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { Tbody, Td, Tr } from "@chakra-ui/react";

export default function TableNoData({ cards }) {
  const {
    state: { file },
  } = useContext(LanguageContext);
  return (
    <Tbody>
      {Array(cards)
        .fill(0)
        .map((val, index) => {
          return (
            <Tr key={index}>
              <Td className="w-full">No Data</Td>
            </Tr>
          );
        })}
    </Tbody>
  );
}
