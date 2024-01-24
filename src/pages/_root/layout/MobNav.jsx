import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { useContext, useEffect, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

import { homeLinks } from "@/constants";
import { LanguageContext } from "@/context/LanguageContext";

const MobNav = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const {
    state: { lang, file },
  } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    onClose();
  }, [pathname]);
  return (
    <>
      <Button
        className="!bg-black-600 !p-1 !text-white-500"
        ref={btnRef}
        onClick={isOpen ? onClose : onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className="!flex !bg-black-500 !text-white-500 !w-full !flex-col !justify-left !items-center !gap-10  !pt-[70px]">
          <DrawerBody className="!w-full !flex !flex-col md:!flex-row !justify-left !items-center !py-5 md:py-0 !gap-7">
            {homeLinks.map((val, index) => {
              return (
                <Link
                  onClick={() => onClose()}
                  activeClass="active headerLink"
                  spy={true}
                  smooth={true}
                  hashSpy={true}
                  offset={50}
                  duration={500}
                  to={val.to}
                  key={index}
                  className={`w-full  p-2 px-1 text-center cursor-pointer hover:text-primary-500 transition-all duration-200`}>
                  <p className="text-text1-semibold">
                    {"0" + (index + 1)}.{file.nav[val.text]}
                  </p>
                </Link>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobNav;
