import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Heading,
  Text,
  Box,
  IconButton,
  Image,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { AdminPath } from "../providers/_user";
import { useContext } from "react";
import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { CONTEXT_TYPEs } from "@/context";
import { LanguageContext } from "@/context/LanguageContext";
import { RootPath } from "../providers/_root";
import { Link, useLocation } from "react-router-dom";
import { convertTimeStampToMomentMonth } from "@/lib/functions";
const BlogCard = ({ val, index }) => {
  const {
    state: { lang, file },
  } = useContext(LanguageContext);
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((val) => val !== "");

  return (
    <>
      <AdminPath>
        {({}) => {
          return (
            <Card className="!w-full col-span-full md:col-span-6 lg:col-span-4 !bg-black-600 !text-white-500">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name={val.user.name} src={val.user.imageURL} />

                    <Box>
                      <Heading size="sm">{val.user.name}</Heading>
                      <Text>{val.user.bio}</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="teal"
                    colorScheme="white"
                    aria-label="See menu"
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Heading size="md">
                  {lang === "en"
                    ? val.enTitle
                    : lang === "ar"
                    ? val.arTitle
                    : val.krTitle}
                </Heading>
              </CardBody>
              <Image
                objectFit="cover"
                className="!w-full !h-[400px]"
                src={val.imageURL}
              />

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}>
                <ButtonGroup spacing="2">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: CONTEXT_TYPEs.BLOG_FORM,
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
                          method: CONTEXT_TYPEs.DELETE_BLOG,
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
      <RootPath>
        {({}) => {
          return (
            <Link
              to={`/blogs/${val._id}`}
              className={`w-full col-span-full md:col-span-6 lg:col-span-4 relative flex flex-col justify-between items-start  gap-2  overflow-hidden  h-full  shadow-xl bg-black-500 p-4   rounded-md  text-center text-white ${
                path.length === 0 && "max-w-[350px]"
              }`}>
              <div className="w-full flex flex-col justify-left items-start gap-2">
                <div className="relative w-full rounded-md h-[250px]">
                  <img
                    className="rounded-md object-cover w-full h-full"
                    src={`${val.imageURL}`}
                    alt="blogImage"
                  />
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-3 mt-2">
                  <img
                    className="w-[25px] h-[25px] object-cover rounded-full"
                    src={val.user.imageURL}
                    alt="userImage"
                  />
                  <span className="text-white-500 text-text1-light">
                    {val.user.name}
                  </span>
                </div>

                <h2
                  className={`text-body2-bold md:text-body1-bold !font-[700] text-left mb-3 ${
                    lang === "en" ? "text-left'" : "text-right"
                  }`}>
                  {lang === "en"
                    ? val.enTitle
                    : lang === "ar"
                    ? val.arTitle
                    : val.krTitle}
                </h2>
              </div>
              <div className="w-full flex flex-row justify-left items-center gap-1.5">
                <span className="opacity-70 cursor-pointer transition-all duration-200 hover:opacity-100 text-white-500">
                  {val.categories.length > 0 ? (
                    <>
                      #
                      {lang === "en"
                        ? val.categories[0].enName
                        : lang === "ar"
                        ? val.categories[0].arName
                        : val.categories[0].krName}
                    </>
                  ) : (
                    "Category"
                  )}
                </span>
                <span className="pb-1">.</span>
                <span className="opacity-70 cursor-pointer transition-all duration-200 hover:opacity-100 text-white-500">
                  {convertTimeStampToMomentMonth(val.date)}
                </span>
              </div>
            </Link>
          );
        }}
      </RootPath>
    </>
  );
};

export default BlogCard;
