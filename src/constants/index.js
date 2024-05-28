import { ENUMs } from "@/lib/enum";
import { QUERY_KEYs } from "@/lib/react-query/types";

export const adminLinks = [
  {
    link: "home",
    text: "home",
  },
  {
    link: "blogs",
    text: "blogs",
  },
  {
    link: "projects",
    text: "projects",
  },
  {
    link: "skills",
    text: "skills",
  },
  {
    link: "certificates",
    text: "certificates",
  },
  {
    link: "works",
    text: "works",
  },
  {
    link: "users",
    text: "users",
  },
  {
    link: "subscribers",
    text: "subscribers",
  },
  {
    link: "configs",
    text: "configs",
  },
];
export const homeLinks = [
  {
    link: "home",
    name: "home",
    icon: "",
  },

  {
    link: "skills",
    name: "skills",
    icon: "",
  },
  {
    link: "projects",
    name: "projects",
    icon: "",
  },

  {
    link: "contact",
    name: "contact",
    icon: "",
  },
];
export const configParts = [
  {
    text: "Categories",
    type: ENUMs.CATEGORY,
    qKey: QUERY_KEYs.CATEGORIES,
  },
  {
    text: "Stacks",
    type: ENUMs.STACK,
    qKey: QUERY_KEYs.STACKS,
  },
  {
    text: "Types",
    type: ENUMs.TYPE,
    qKey: QUERY_KEYs.TYPES,
  },
];
export const services = [
  {
    text: "Mobile application development",
    color: "bg-primary-500",
  },
  {
    text: "UI/UX Design",
    color: "bg-green-500",
  },
  {
    text: "Web application development",
    color: "bg-orange-500",
  },
  {
    text: "API development",
    color: "bg-pink-500",
  },
];

export const privacyPolicy = [
  {
    header: "Information Collection",
    body: "Our website does not collect any personal information or use cookies for tracking purposes. We are a portfolio showcase and do not gather data from our visitors.",
  },
  {
    header: "Third-Party Tools and Services",
    body: "While visiting our site, please be aware that third-party tools or services may be utilized. These tools may have their own privacy policies, and we do not control or have access to any data collected by them.",
  },
  {
    header: "Contact Form Information",
    body: "If you choose to contact us through our website's contact form, the information you provide, such as your name, email, and message, will only be used for communication purposes. We do not share or store this information for any other purpose.",
  },
  {
    header: "Security Measures",
    body: "We have implemented reasonable security measures to protect any information that may be collected inadvertently. Our commitment to privacy and data security is paramount.",
  },
];
