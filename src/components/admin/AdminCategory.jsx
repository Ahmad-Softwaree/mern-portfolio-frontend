import React, { Fragment, useContext } from "react";
import { Tr, Td } from "@chakra-ui/react";
import DateMoment from "../global/DateMoment";
import { UtilContext } from "../../context/UtilContext";
import { TOGGLE_WANT_TO_DELETE } from "../../context/types/util_types";
import { DELETE_ONE_CATEGORY_METHOD } from "../../context/types/delete_types";
import { UiContext } from "../../context/UiContext";
import { UPDATE_CATEGORY } from "../../context/types/ui_types";
export default function AdminCategory({ val, index }) {
  const { dispatch: utilDispatch } = useContext(UtilContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  return (
    <Fragment key={index}>
      <Tr borderRadius={`10px`}>
        <Td>{index}</Td>
        <Td>{val.enName}</Td>

        <Td>
          <DateMoment date={val.createdAt} />
        </Td>
        <Td>
          <div className="flex flex-row justify-start items-center gap-3">
            <span
              onClick={() => {
                uiDispatch({
                  type: UPDATE_CATEGORY,
                  payload: val,
                });
              }}
              className="p-1 rounded-full px-2 border-2 border-solid border-yellow text-yellow transition-all duration-300 hover:bg-yellow hover:text-white cursor-pointer !text-[12px]"
            >
              <i className="fa-solid fa-pen"></i>
            </span>
            <span
              onClick={() => {
                utilDispatch({
                  type: TOGGLE_WANT_TO_DELETE,
                  payload: {
                    method: DELETE_ONE_CATEGORY_METHOD,
                    id: val._id,
                  },
                });
              }}
              className="p-1 rounded-full px-2 border-2 border-solid border-purple text-purple transition-all duration-300 hover:bg-purple hover:text-white cursor-pointer !text-[12px]"
            >
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </Td>
      </Tr>
    </Fragment>
  );
}
