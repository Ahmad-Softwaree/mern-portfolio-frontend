import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { RootPath } from "../providers/_root";
import {
  Card,
  Image,
  CardBody,
  Stack,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { CONTEXT_TYPEs } from "@/context";
import { AdminPath } from "../providers/_user";
import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { Link } from "react-router-dom";
export default function WorkCard({ val, index }) {
  const {
    state: { file, lang },
  } = useContext(LanguageContext);
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);
  return (
    <>
      <RootPath>
        {({}) => {
          return (
            <>
              <div
                id={`workCardId-${index}`}
                className="hidden md:col-span-6 lg:col-span-4 md:flex flex-col justify-between gap-5 items-start  bg-black-500 p-5 transition-all  h-[280px] duration-300 cursor-pointer rounded-md text-white-500 hover:scale-[1.1] hover:border-primary-500 border-2 border-solid border-niceBlack">
                <div className="w-full flex flex-col justify-left items-start gap-5">
                  <img
                    src={`${val.imageURL}`}
                    alt="workCardImage"
                    className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primary-500 object-contain"
                  />
                  <p className="!text-[16px]">
                    {file.work.title}: &nbsp;
                    {lang === "en"
                      ? val.enTitle
                      : lang === "ar"
                      ? val.arTitle
                      : val.krTitle}
                  </p>
                  <p className="!text-[16px]">
                    {file.work.company}: &nbsp;{val.company}
                  </p>
                </div>
                {val.link && (
                  <a
                    href={`${val.link}`}
                    target="_blank"
                    className="link flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1">
                    <span className="!text-[14px] text-white-500">visit</span>
                    <OpenInNew className="text-white-500" fontSize="14px" />
                  </a>
                )}
              </div>
              <div className="flex md:hidden col-span-1 h-[150px]">
                <Link
                  to={val.url}
                  target="_black"
                  className="relative w-full  rounded-xl bg-black-500 p-2 cursor-pointer">
                  <img
                    className="w-full object-contain rounded-xl h-full"
                    src={val.imageURL}
                    alt=""
                  />
                </Link>
              </div>
            </>
          );
        }}
      </RootPath>
      <AdminPath>
        {({}) => {
          return (
            <Card className="!w-full col-span-full md:col-span-4 lg:col-span-3 !bg-black-600 !text-white-500">
              <CardBody>
                <Image
                  src={val.imageURL}
                  alt="Green double couch with wooden legs"
                  className="!w-[100px] !h-[100px] !object-contain !rounded-full"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{val.enTitle}</Heading>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: CONTEXT_TYPEs.WORK_FORM,
                        payload: {
                          data: val,
                          id: val._id,
                          type: "update",
                        },
                      });
                    }}
                    variant="solid"
                    colorScheme="teal">
                    Update
                  </Button>
                  <Button
                    onClick={() =>
                      util({
                        type: CONTEXT_TYPEs.DELETE,
                        payload: {
                          method: CONTEXT_TYPEs.DELETE_WORK,
                          id: val._id,
                          image: val.imageName,
                        },
                      })
                    }
                    variant="ghost"
                    colorScheme="red">
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        }}
      </AdminPath>
    </>
  );
}
