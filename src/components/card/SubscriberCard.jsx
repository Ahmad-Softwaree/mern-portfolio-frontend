import { Card, CardBody, Stack, Heading, Text } from "@chakra-ui/react";
export const SubscriberCard = ({ val }) => {
  return (
    <Card className="!col-span-full md:!col-span-4 !w-full !bg-black-600 !text-white-500">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">Subscriber</Heading>
          <Text>Email: {val.email}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SubscriberCard;
