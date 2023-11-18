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
import { ENGLISH } from "../context/types/language_types";

export const Universal = () => {
  const {
    dispatch: languageDispatch,
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
      {
        element: "#about .aboutHeader",
        popover: {
          title: "About me",
          description: "You can see more about me here",
        },
      },
      {
        element: "#services .serviceHeader",
        popover: {
          title: "My Services",
          description: "You can see more about my services here",
        },
      },
      {
        element: "#skills .skillsHeader",
        popover: {
          title: "My Skills",
          description: "You can see more about my skills here",
        },
      },
      {
        element: "#skills #skillCardId-0",
        popover: {
          title: "Skill Card",
          description:
            "This card show my skills, You can see what I use this for at the bottom of the card",
        },
      },
      {
        element: "#projects .projectsHeader",
        popover: {
          title: "My Projects",
          description: "You can see more about my projects here",
        },
      },
      {
        element: "#projects #projectCardId-0",
        popover: {
          title: "Project Card",
          description:
            "This card show my project, You can see what I used in this project, gits, and all software used",
        },
      },
      {
        element: "#projects #projectCardId-0 .types",
        popover: {
          title: "Project Types",
          description:
            "The types of this project, click it, you can see similer project of that type",
        },
      },
      {
        element: "#projects #projectCardId-0 .gits",
        popover: {
          title: "Project Gits",
          description: "The Gits of this project, you can see the codes",
        },
      },
      {
        element: "#projects #projectCardId-0 .stacks",
        popover: {
          title: "Project Stacks",
          description:
            "The Stacks of this projects, click them you can see project by stack",
        },
      },
      {
        element: "#projects #projectCardId-0 .preview",
        popover: {
          title: "Project Preview",
          description: "See the project in action, visit link",
        },
      },
      {
        element: "#projects #projectCardId-0 .more",
        popover: {
          title: "Project More",
          description: "See More about this project in single page",
        },
      },
      {
        element: "#certificate .certificateHeader",
        popover: {
          title: "My Certificates",
          description: "You can see more about my certificates here",
        },
      },
      {
        element: "#certificate #certificateCardId-0",
        popover: {
          title: "Certificate Card",
          description: "This card show my Certificate",
        },
      },
      {
        element: "#certificate #certificateCardId-0 .link",
        popover: {
          title: "Course Link",
          description: "This is the course link",
        },
      },
      {
        element: "#certificate #certificateCardId-0 .more",
        popover: {
          title: "Certificate More",
          description: "You can see more about this certificate",
        },
      },
      {
        element: "#certificate #certificateCardId-0 .image",
        popover: {
          title: "Certificate Image",
          description: "This is certification Photo",
        },
      },

      {
        element: "#works .workHeader",
        popover: {
          title: "My Works",
          description: "You can see more about my works here",
        },
      },
      {
        element: "#works #workCardId-0",
        popover: {
          title: "Work Card",
          description: "This card show my Work for a company",
        },
      },
      {
        element: "#works #workCardId-0 .link",
        popover: {
          title: "Course Link",
          description: "This is the company website link",
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
    if (localStorage.getItem("driver") == "1") return;
    languageDispatch({ type: ENGLISH });
    driverObj.drive();
    localStorage.setItem("driver", "1");
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
