import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { CONTEXT_TYPEs } from "@/context";
import {
  Card,
  Image,
  CardBody,
  Stack as ChakraStack,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useContext } from "react";
import { AdminPath } from "../providers/_user";
import { RootPath } from "../providers/_root";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/context/LanguageContext";
import { Stack } from "../shared";

export const ProjectCard = ({ val, index }) => {
  const {
    state: { lang, file },
  } = useContext(LanguageContext);
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);

  return (
    <>
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
                <ChakraStack mt="6" spacing="3">
                  <Heading size="md">
                    {" "}
                    {lang === "en"
                      ? val.enTitle
                      : lang === "ar"
                      ? val.arTitle
                      : val.krTitle}
                  </Heading>
                </ChakraStack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: CONTEXT_TYPEs.PROJECT_FORM,
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
                          method: CONTEXT_TYPEs.DELETE_PROJECT,
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
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        }}
      </AdminPath>
      <RootPath>
        {({}) => {
          return (
            <div
              className={`relative bg-black-800 h-[540px] w-full md:w-[500px] flex flex-col justify-center items-center gap-5  flex-wrap  shadow-xl p-5 rounded-lg  ${
                lang !== "en" && "items-start"
              }`}
            >
              <div className="flex flex-col justify-left items-start gap-5 w-full rounded-xl">
                <Link
                  className="min-w-full h-[250px] rounded-xl"
                  to={`/projects/${val._id}`}
                >
                  {" "}
                  <img
                    className="min-w-full h-[250px] rounded-xl object-cover"
                    src={`${val.imageURL}`}
                    alt="Project Image"
                  />
                </Link>

                <div className="flex flex-col justify-left items-center gap-1 w-full">
                  <Link
                    to={`/projects/${val._id}`}
                    className="text-white text-body1-semibold md:text-sub-heading3-semibold hover:text-primary-500 transition-all duration-200  font-bold w-full"
                  >
                    {lang === "en"
                      ? val.enTitle
                      : lang === "ar"
                      ? val.arTitle
                      : val.krTitle}
                    {"        "}
                    <OpenInNewIcon className="text-white" fontSize="14px" />
                  </Link>
                  <h2 className=" text-text2-light md:text-text1-light  w-full">
                    {lang === "en"
                      ? val.enDesc.substring(0, 60).concat("...")
                      : lang === "ar"
                      ? val.arDesc.substring(0, 60).concat("...")
                      : val.krDesc.substring(0, 60).concat("...")}
                    &nbsp;
                    <Link
                      to={`/projects/${val._id}`}
                      className="!text-[14px] text-primary-500"
                    >
                      {file.blog.seeMore}
                    </Link>
                  </h2>
                </div>
              </div>

              <div className="w-full flex items-center bg-transparent">
                {val.stacks.length > 0 &&
                  val.stacks.map((one, index) => {
                    return (
                      <Stack
                        to={`/projects?stack=${one?._id}`}
                        val={one}
                        index={index}
                        key={one._id}
                      />
                    );
                  })}
              </div>
            </div>
          );
        }}
      </RootPath>
    </>
  );
};

export default ProjectCard;
