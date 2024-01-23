import { UtilContext } from "@/context/UtilContext";
import { UiContext } from "@/context/UiContext";
import { useContext } from "react";
import { CONTEXT_TYPEs } from "@/context";
import {
  Card,
  CardBody,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { LanguageContext } from "@/context/LanguageContext";
export default function ConfigCard({ val, qKey, config }) {
  const { dispatch } = useContext(UtilContext);
  const { dispatch: ui } = useContext(UiContext);
  const {
    state: { lang },
  } = useContext(LanguageContext);
  return (
    <Card className="!bg-black-600 !text-white-500">
      <CardBody>
        <Text>
          {lang === "en" ? val.enName : lang === "ar" ? val.arName : val.krName}
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              ui({
                type: CONTEXT_TYPEs.CONFIG_FORM,
                payload: {
                  data: val,
                  qKey: qKey,
                  config: config,
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
              dispatch({
                type: CONTEXT_TYPEs.DELETE,
                payload: {
                  method: CONTEXT_TYPEs.DELETE_CONFIG,
                  id: val._id,
                  type: qKey,
                },
              })
            }
            className="!bg-primary-500 !text-white-500">
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
