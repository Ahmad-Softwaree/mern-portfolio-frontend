import Logo from "@/components/shared/Logo";

import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { MobNav } from ".";
import { GrLanguage } from "react-icons/gr";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { CONTEXT_TYPEs } from "@/context";
import { PiKeyReturnFill } from "react-icons/pi";
const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((val) => val != "");
  const { dispatch } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <header className="header w-full fixed top-0 left-0 right-0 p-1 flex flex-row z-[1500] justify-between items-center gap-10 bg-black-600 text-white-500 shadow-md">
      <div onClick={() => navigate("/")} className="relative">
        <NavLink
          to={`/`}
          className={`text-body2-bold md:text-sub-heading3-bold lg:text-sub-heading2-bold`}>
          <h1>
            <span className="text-primary-500">A</span>hmad{" "}
            <span className="text-primary-500">S</span>oftware
          </h1>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <Menubar className="!border-none">
          <MenubarMenu className="!border-none focus:!bg-transparent ">
            <MenubarTrigger className="!cursor-pointer !border-none">
              <GrLanguage className="text-[20px]" />
            </MenubarTrigger>
            <MenubarContent className="!z-[1500] !bg-black-600 !text-white-500 !min-w-[1rem] !w-fit">
              <MenubarItem
                onClick={(e) => {
                  dispatch({
                    type: CONTEXT_TYPEs.ENGLISH,
                  });
                }}
                className="!w-full !text-center !transition-all !duration-200 ">
                English
              </MenubarItem>
              <MenubarSeparator className="!my-0" />
              <MenubarItem
                onClick={(e) => {
                  dispatch({
                    type: CONTEXT_TYPEs.ARABIC,
                  });
                }}
                className="!w-full !text-center !transition-all !duration-200 ">
                {" "}
                Arabic
              </MenubarItem>
              <MenubarSeparator className="!my-0" />
              <MenubarItem
                onClick={(e) => {
                  dispatch({
                    type: CONTEXT_TYPEs.KURDISH,
                  });
                }}
                className="!w-full !text-center !transition-all !duration-200 ">
                Kurdish
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {path.length === 0 ? (
          <MobNav />
        ) : (
          <Link to={-1}>
            <PiKeyReturnFill className="text-[25px]" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
