import { configParts } from "@/constants";
import { Config } from "@/containers/_user";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

export default function Configs() {
  return (
    <div className="w-full flex flex-col justify-left items-center gap-10">
      <h1 className="text-heading3-bold md:text-heading2-bold">Configs</h1>

      <Accordion allowToggle defaultIndex={[0]} className="!w-full">
        {configParts.map((val, index) => {
          return (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="right">
                    {val.text}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Config type={val.type} qKey={val.qKey} />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
