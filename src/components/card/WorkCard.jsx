import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
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
  Button as ChakraButton,
  Text,
} from "@chakra-ui/react";
import { CONTEXT_TYPEs } from "@/context";
import { AdminPath } from "../providers/_user";
import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
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
            <div className={`flex flex-row justify-center items-center gap-2`}>
              <img
                className={`w-10 lg:w-20 h-10 lg:h-20 object-contain`}
                src={val.imageURL}
                alt={val.imageName}
              />
              <p className="text-text1-semibold lg:text-body2-semibold">
                {val.company}
              </p>
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
                  <ChakraButton
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
                    colorScheme="teal"
                  >
                    Update
                  </ChakraButton>
                  <ChakraButton
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
                    colorScheme="red"
                  >
                    Delete
                  </ChakraButton>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        }}
      </AdminPath>
    </>
  );
}
