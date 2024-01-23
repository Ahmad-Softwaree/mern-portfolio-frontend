import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { convertTimeStampToDate } from "@/lib/functions";
import { RootPath } from "../providers/_root";
import { AdminPath } from "../providers/_user";
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
import { UtilContext } from "@/context/UtilContext";
import { UiContext } from "@/context/UiContext";
import { CONTEXT_TYPEs } from "@/context";
export default function CertificateCard({ val, index }) {
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
            <div
              id={`certificateCardId-${index}`}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              className={`relative w-full grid grid-cols-2 gap-10`}>
              <div
                className={`relative col-span-full lg:col-span-1 bg-black-700 flex flex-col justify-center items-end gap-5 md:gap-10 flex-wrap shadow-xl p-5 rounded-lg
                 ${index % 2 === 0 ? "order-1" : "order-2"}
                ${lang !== "en" && "items-start"}`}>
                <div className="flex flex-col justify-left items-start gap-5 w-full">
                  <span className="text-white-500 !text-[14px] md:!text-[16px]">
                    {convertTimeStampToDate(val.date)}
                  </span>
                  <img
                    className="hidden md:flex w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full object-cover"
                    src={`${val.imageURL}`}
                    alt="Project Image"
                  />

                  <div className="flex flex-col justify-left items-center gap-1 w-full">
                    <h2 className="text-white-500 !text-[16px] md:!text-[18px] font-[500] w-full">
                      {lang === "en"
                        ? val.enTitle
                        : lang === "ar"
                        ? val.arTitle
                        : val.krTitle}
                    </h2>
                    <h2 className="text-niceGray !text-[16px] md:!text-[18px] font-[500] w-full ">
                      {lang === "en"
                        ? val.enDesc
                        : lang === "ar"
                        ? val.arDesc
                        : val.krDesc}
                    </h2>
                  </div>
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-5">
                  {val.url && (
                    <a
                      href={`${val.url}`}
                      target="_blank"
                      className="link flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1">
                      <span className="!text-[14px] text-white-500">
                        {file.certificates.link}
                      </span>
                      <OpenInNewIcon
                        className="text-white-500"
                        fontSize="14px"
                      />
                    </a>
                  )}
                  <Link
                    to={`/certificates/${val._id}`}
                    className="more flex flex-row gap-1 justify-center items-center text-white-500  px-2 border-2 border-solid border-primary-500 transition-all duration-300 hover:bg-primary-500 hover:text-white-500 rounded-md cursor-pointer p-1">
                    <span className="!text-[14px] text-white-500">
                      {file.projects.more}
                    </span>
                    <ReadMoreIcon className="text-white-500" fontSize="14px" />
                  </Link>
                </div>
              </div>

              <img
                src={val.imageURL}
                alt="certificateImage"
                className={`image cols-span-1 hidden lg:flex  object-contain origin-center  ${
                  index % 2 === 0 ? "order-2" : "order-1"
                }`}
              />
            </div>
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
                        type: CONTEXT_TYPEs.CERTIFICATE_FORM,
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
                          method: CONTEXT_TYPEs.DELETE_CERTIFICATE,
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
