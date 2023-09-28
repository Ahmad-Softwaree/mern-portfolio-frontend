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
import { ENGLISH } from "../context/types/language_types";
import Private from "./global/Private";
import UpdateAdmin from "./admin/UpdateAdmin";

export const Universal = () => {
  const {
    dispatch: languageDispatch,
    state: { language },
  } = useContext(LanguageContext);

  useEffect(() => {
    languageDispatch({
      type: ENGLISH,
    });
  }, []);
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
  }, [language]);

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
