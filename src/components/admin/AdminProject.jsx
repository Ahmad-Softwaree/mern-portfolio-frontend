import React, { Fragment, useContext } from "react";
import { Tr, Td } from "@chakra-ui/react";
import DateMoment from "../global/DateMoment";
import { UtilContext } from "../../context/UtilContext";
import { UiContext } from "../../context/UiContext";
import { TOGGLE_WANT_TO_DELETE } from "../../context/types/util_types";
import { DELETE_ONE_PROJECT_METHOD } from "../../context/types/delete_types";
import { UPDATE_PROJECT } from "../../context/types/ui_types";
export default function AdminProject({ val, index }) {
  const { dispatch: utilDispatch } = useContext(UtilContext);
  const { dispatch: uiDispatch } = useContext(UiContext);
  return (
    <Fragment key={index}>
      <Tr borderRadius={`10px`}>
        <Td>{index}</Td>
        <Td>{val.enTitle}</Td>
        <Td>{val.enType}</Td>

        <Td>
          <img
            className="w-[100px] h-[60px] object-cover rounded-md"
            src={val.imageURL}
            alt=""
          />
        </Td>
        <Td>
          <DateMoment date={val.date} />
        </Td>
        <Td>
          <span
            className={`p-2 rounded-md border-2 border-solid border-blue text-blue !text-[14px] transition-all duration-300 hover:bg-blue hover:text-black cursor-pointer`}
          >
            {val.stacks[0]?.stack?.name}
          </span>
        </Td>
        <Td>
          <div className="flex flex-row justify-start items-center gap-3">
            <span
              onClick={() => {
                uiDispatch({
                  type: UPDATE_PROJECT,
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
                    method: DELETE_ONE_PROJECT_METHOD,
                    id: val._id,
                    image: val.imageName,
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
