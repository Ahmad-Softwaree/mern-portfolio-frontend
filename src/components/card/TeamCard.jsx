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
import { Link } from "react-router-dom";
const TeamCard = ({ val }) => {
  return (
    <Card className="!w-full !h-full !flex !flex-col !justify-left !items-center  !shadow-lg !bg-[#f9f8ff]">
      <CardBody className="!flex !flex-col !justify-left !items-center !w-full">
        <Image
          src={val.imageURL}
          alt="Green double couch with wooden legs"
          className="!w-[100px] !h-[100px] !object-cover !rounded-full"
        />
        <Stack
          className="!flex !flex-col !justify-left !items-center !w-full"
          mt="6"
          spacing="3">
          <Heading size="md">{val.name}</Heading>
          <Text className="!text-text2-light md:!text-text1-light">
            {val.bio}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter className="!w-full justify-center">
        <Button
          variant="solid"
          className="!bg-primary-500 rounded-md !text-white-500-500">
          <Link to={val.link}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
