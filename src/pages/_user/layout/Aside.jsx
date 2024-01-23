import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { HamburgerIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { adminLinks } from "@/constants";
import { GoHomeFill } from "react-icons/go";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import Logo from "@/components/shared/Logo";
import { RiTeamFill } from "react-icons/ri";
import { useLogout } from "@/lib/react-query/query/auth.query";
import { BiSolidCategory } from "react-icons/bi";
import { PiDesktopTowerFill } from "react-icons/pi";
import { PiCertificateBold } from "react-icons/pi";
const Aside = () => {
  const { mutateAsync, isPending } = useLogout();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    onClose();
  }, [pathname]);
  return (
    <>
      <Button
        className="!right-0 !fixed !m-5 !z-[1000] !bg-primary-500"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className="!flex !bg-black-500 !text-white-500 !w-full !flex-col !justify-left !items-center !gap-10">
          <DrawerCloseButton className="!z-[1000] !cursor-pointer" />
          <DrawerHeader className="!w-full">Dashboard Navigation</DrawerHeader>
          <Logo size="lg" />

          <DrawerBody className="!w-full !flex !flex-col !justify-left !items-center !gap-10">
            {adminLinks.map((val, index) => {
              let isActive = path.includes(val.link);
              return (
                <NavLink key={val.link} to={val.link} className={`w-full`}>
                  <Button
                    className={`w-full flex flex-row justify-start items-center gap-5 ${
                      isActive
                        ? "!bg-primary-500 !text-white-500"
                        : "!bg-white-500"
                    }`}>
                    {val.link === "blogs" ? (
                      <FaBlogger size={`24px`} />
                    ) : val.link === "projects" ? (
                      <PiProjectorScreenChartFill size={`24px`} />
                    ) : val.link === "users" ? (
                      <MdAdminPanelSettings size={`24px`} />
                    ) : val.link === "configs" ? (
                      <GrConfigure size={`24px`} />
                    ) : val.link === "subscribers" ? (
                      <RiTeamFill size={`24px`} />
                    ) : val.link === "skills" ? (
                      <BiSolidCategory size={`24px`} />
                    ) : val.link === "works" ? (
                      <PiDesktopTowerFill size={`24px`} />
                    ) : val.link === "certificates" ? (
                      <PiCertificateBold size={`24px`} />
                    ) : (
                      <GoHomeFill size={`24px`} />
                    )}
                    <p className="text-body2-semibold">{val.text}</p>
                  </Button>
                </NavLink>
              );
            })}
          </DrawerBody>

          <DrawerFooter className="!w-full !text-center  !justify-center !items-center !font-bold !text-body1-bold !flex !flex-col !gap-10">
            <NavLink to={`/`} className={`w-full`}>
              <Button
                colorScheme="red"
                className="w-full flex flex-row justify-start items-center gap-5">
                <ExternalLinkIcon />
                <p className="text-body2-semibold">Go out</p>
              </Button>
            </NavLink>
            <Button
              disabled={isPending}
              onClick={() => mutateAsync()}
              colorScheme="red"
              className="w-full flex flex-row justify-start items-center gap-5">
              <ExternalLinkIcon />
              <p className="text-body2-semibold">Logout</p>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Aside;
