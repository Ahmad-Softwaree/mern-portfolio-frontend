import React, { Fragment, useContext } from "react";
import { Tr, Td } from "@chakra-ui/react";
import DateMoment from "../global/DateMoment";
import { Link } from "react-router-dom";
import { UtilContext } from "../../context/UtilContext";
import { TOGGLE_WANT_TO_DELETE } from "../../context/types/util_types";
import { DELETE_ONE_BLOG_METHOD } from "../../context/types/delete_types";
export default function AdminBlog({ val, index }) {
  const { dispatch: utilDispatch } = useContext(UtilContext);
  return (
    <Fragment key={index}>
      <Tr borderRadius={`10px`}>
        <Td>{index}</Td>
        <Td>{val.enTitle}</Td>
        <Td>
          <img
            className="w-[100px] h-[60px] object-cover rounded-md"
            src={val.imageURL}
            alt=""
          />
        </Td>
        <Td>
          <DateMoment date={val.createdAt} />
        </Td>
        <Td>
          <span className="p-2 rounded-md border-2 border-solid border-blue text-blue !text-[14px] transition-all duration-300 hover:bg-blue hover:text-black cursor-pointer">
            {val.categories[0]?.category.enName}
          </span>
        </Td>
        <Td>
          <div className="flex flex-row justify-start items-center gap-3">
            <Link
              to={`update_blog/${val._id}`}
              className="p-1 rounded-full px-2 border-2 border-solid border-yellow text-yellow transition-all duration-300 hover:bg-yellow hover:text-white cursor-pointer !text-[12px]"
            >
              <i className="fa-solid fa-pen"></i>
            </Link>
            <span
              onClick={() => {
                utilDispatch({
                  type: TOGGLE_WANT_TO_DELETE,
                  payload: {
                    method: DELETE_ONE_BLOG_METHOD,
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
