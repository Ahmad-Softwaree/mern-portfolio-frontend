import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import { ENUMs } from "@/lib/enum";
import { useState } from "react";

const Filter = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("filter");
  return (
    <Menu placement="start-start" className="!w-[200px]">
      <MenuButton
        className="!w-[200px]"
        as={Button}
        rightIcon={<ChevronDownIcon />}>
        {value}
      </MenuButton>
      <MenuList className="!max-h-[400px] !w-full !overflow-y-auto">
        <MenuItem
          className="!text-black-500"
          onClick={(e) => {
            setValue("filter");
            setSearchParams((prev) => {
              prev.delete(ENUMs.FILTER_PARAM);
              return prev;
            });
          }}
          value={`filter`}>
          filter
        </MenuItem>
        {options?.length > 0 &&
          options?.map((val, index) => {
            return (
              <MenuItem
                className="!text-black-500"
                onClick={(e) => {
                  setValue(val.enName);
                  setSearchParams((prev) => {
                    prev.set(ENUMs.FILTER_PARAM, e.target.value);
                    return prev;
                  });
                }}
                value={val._id}
                key={index}>
                {val.enName}
              </MenuItem>
            );
          })}
      </MenuList>
    </Menu>
  );
};

export default Filter;
