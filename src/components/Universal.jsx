import React, { Fragment, useContext, useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import Alert from "./Alert";
import { LanguageContext } from "../context/LanguageContext";
import WantToDelete from "./admin/WantToDelete";
import { UtilContext } from "../context/UtilContext";
import Opacity from "./Opacity";
import { UiContext } from "../context/UiContext";
import AddCategory from "./admin/AddCategory";
import UpdateCategory from "./admin/UpdateCategory";
import AddProject from "./admin/AddProject";
import UpdateProject from "./admin/UpdateProject";
import AddWork from "./admin/AddWork";
import UpdateWork from "./admin/UpdateWork";
import AddStack from "./admin/AddStack";
import UpdateStack from "./admin/UpdateStack";
import AddType from "./admin/AddType";
import UpdateType from "./admin/UpdateType";
import AddSkill from "./admin/AddSkill";
import UpdateSkill from "./admin/UpdateSkill";
import AddCertificate from "./admin/AddCertificate";
import UpdateCertificate from "./admin/UpdateCertificate";
import Private from "./global/Private";
import UpdateAdmin from "./admin/UpdateAdmin";
import { driver } from "driver.js";

export const Universal = () => {
  const {
    state: { language },
  } = useContext(LanguageContext);

  const driverObj = driver({
    showProgress: true,
    popoverClass: "driverPopOver",
    steps: [
      {
        element: ".header",
        popover: {
          title: "Navigation",
          description: "You can navigate through my website here",
        },
      },
      {
        element: ".header .languageDiv",
        popover: {
          title: "Language",
          description: "You can change the language from here",
        },
      },
      {
        element: ".downloadCV",
        popover: {
          title: "CV",
          description: "You can download my cv here and see it (PDF)",
        },
      },
      {
        element: "#blogs h1",
        popover: {
          title: "Blogs",
          description:
            "You can see my latest blogs here in this section, my thought and ideas about everything",
        },
      },
      {
        element: "#blogs #blogCardId-0",
        popover: {
          title: "Blog Card",
          description: "Hover this card and you can see more about this blog",
        },
      },
      {
        element: "#blogs .blogsLink",
        popover: {
          title: "See more blogs",
          description: "You can see more blogs by click this button",
        },
      },
    ],
  });

  useLayoutEffect(() => {
    if (language === "en") {
      document.body.style.direction = "ltr";
      document.body.classList.remove("font-rabar");
      document.body.classList.add("font-poppins");
    } else {
      document.body.style.direction = "rtl";
      document.body.classList.remove("font-poppins");
      document.body.classList.add("font-rabar");
    }
  }, [language, driverObj]);

  useEffect(() => {
    driverObj.drive();
  }, [driverObj]);

  const {
    state: { wantToDelete },
  } = useContext(UtilContext);
  const {
    state: {
      addCategory,
      updateCategory,
      addProject,
      updateProject,
      addWork,
      updateWork,
      addStack,
      updateStack,
      addType,
      updateType,
      addSkill,
      updateSkill,
      addCertificate,
      updateCertificate,
      private: privateProject,
      updateAdmin,
      addAdmin,
    },
  } = useContext(UiContext);
  const flag = Boolean(
    wantToDelete ||
      addCategory ||
      updateCategory ||
      addProject ||
      updateProject ||
      addWork ||
      updateWork ||
      addStack ||
      updateStack ||
      addType ||
      updateType ||
      addSkill ||
      updateSkill ||
      addCertificate ||
      updateCertificate ||
      privateProject ||
      addAdmin ||
      updateAdmin
  );
  return (
    <Fragment>
      {flag && <Opacity />}
      {wantToDelete && <WantToDelete />}
      {addCategory && <AddCategory />}
      {updateCategory && <UpdateCategory />}
      {addProject && <AddProject />}
      {updateProject && <UpdateProject />}
      {addWork && <AddWork />}
      {updateWork && <UpdateWork />}
      {addStack && <AddStack />}
      {updateStack && <UpdateStack />}
      {addType && <AddType />}
      {updateType && <UpdateType />}
      {addSkill && <AddSkill />}
      {updateSkill && <UpdateSkill />}
      {addCertificate && <AddCertificate />}
      {updateCertificate && <UpdateCertificate />}
      {updateAdmin && <UpdateAdmin />}
      {privateProject && <Private />}
      <Alert />
      <Outlet />
    </Fragment>
  );
};

export default Universal;
