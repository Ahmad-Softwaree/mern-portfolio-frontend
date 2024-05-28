import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { AdminPath } from "../providers/_user";
import { RootPath } from "../providers/_root";
import { Button } from "@chakra-ui/react";
import { CONTEXT_TYPEs } from "@/context";
import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";

export default function SkillCard({ val, index }) {
  const {
    state: { lang },
  } = useContext(LanguageContext);
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);
  return (
    <>
      <RootPath>
        {({}) => {
          return (
            <div
              id={`skillCardId-${index}`}
              className="w-fit md:w-[200px]  max-w-[200px] rounded-md cursor-pointer  p-2 md:px-1 transition-all flex flex-row md:flex-col flex-wrap md:flex-nowrap justify-left px-3 items-center gap-3 border-black-600  duration-300 bg-black-600 shadow-xl hover:border-primary-500 flex-auto border-2 border-solid hover:scale-[1.1] hover:text-red"
            >
              <img
                className="w-[25px] md:w-full h-[30px] md:h-[100px] object-contain md:px-5"
                src={val.imageURL}
                alt="skillImage"
              />
              <span className="md:w-full text-center text-white-500  text-text2-light md:text-text1-semibold !font-Poppins md:px-5">
                {val.name}
              </span>
              <div className="hidden md:flex w-full flex-row flex-wrap justify-center items-center gap-2">
                {val.types.map((one, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-center items-center gap-2"
                    >
                      <span className="w-fit text-left text-white-500 opacity-60 font-[500] !text-[12px]">
                        {lang === "en"
                          ? one?.enName
                          : lang === "ar"
                          ? one?.arName
                          : one?.krName}
                      </span>
                      {index !== val?.types?.length - 1 && (
                        <small className="mb-1.5 text-primary-500 !text-[20px] font-bold">
                          +
                        </small>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </RootPath>
      <AdminPath>
        {({}) => {
          return (
            <div
              id={`skillCardId-${index}`}
              className="max-w-[200px] col-span-full md:col-span-4 lg:col-span-3 w-full rounded-md cursor-pointer  p-5 px-1 transition-all flex flex-col justify-left items-center gap-3 border-niceBlack  duration-300 bg-black-80 shadow-xl hover:border-primary-500 flex-auto border-2 border-solid hover:scale-[1.1] hover:text-red"
            >
              <img
                className="w-full h-[50px] md:h-[100px] object-contain px-5"
                src={val.imageURL}
                alt="skillImage"
              />
              <span className="w-full text-center text-white-500 font-bold !text-[14px] md:!text-[18px] font-Poppins px-5">
                {val.name}
              </span>
              <div className="w-full flex flex-row flex-wrap justify-center items-center gap-2">
                {val.types.map((one, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-center items-center gap-2"
                    >
                      <span className="w-fit text-left text-white-500 opacity-60 font-[500] !text-[12px]">
                        {lang === "en"
                          ? one?.enName
                          : lang === "ar"
                          ? one?.arName
                          : one?.krName}
                      </span>
                      {index !== val?.types?.length - 1 && (
                        <small className="mb-1.5 text-primary-500 !text-[20px] font-bold">
                          +
                        </small>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex flex-row  gap-5">
                <Button
                  onClick={() => {
                    dispatch({
                      type: CONTEXT_TYPEs.SKILL_FORM,
                      payload: {
                        data: val,
                        id: val._id,
                        type: "update",
                      },
                    });
                  }}
                  variant="solid"
                  colorScheme="teal"
                >
                  Update
                </Button>
                <Button
                  onClick={() =>
                    util({
                      type: CONTEXT_TYPEs.DELETE,
                      payload: {
                        method: CONTEXT_TYPEs.DELETE_SKILL,
                        id: val._id,
                        image: val.imageName,
                      },
                    })
                  }
                  variant="ghost"
                  colorScheme="red"
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        }}
      </AdminPath>
    </>
  );
}
