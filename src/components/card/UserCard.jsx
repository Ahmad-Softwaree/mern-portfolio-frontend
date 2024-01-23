import { UiContext } from "@/context/UiContext";
import { UtilContext } from "@/context/UtilContext";
import { CONTEXT_TYPEs } from "@/context";
import {
  Card,
  Image,
  CardHeader,
  CardBody,
  Stack,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
export const UserCard = ({ val }) => {
  const { dispatch } = useContext(UiContext);
  const { dispatch: util } = useContext(UtilContext);

  return (
    <Card className="!bg-black-600 !text-white-500 !col-span-full md:!col-span-4 !w-full">
      <CardBody>
        <Image
          src={val.imageURL}
          alt="Green double couch with wooden legs"
          className="!w-[100px] !h-[100px] !object-cover !rounded-full"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Admin</Heading>
          <Text>Email: {val.email}</Text>
          <Text>Name: {val.name}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              dispatch({
                type: CONTEXT_TYPEs.USER_FORM,
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
                  method: CONTEXT_TYPEs.DELETE_USER,
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
};

export default UserCard;
